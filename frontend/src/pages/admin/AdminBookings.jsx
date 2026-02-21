import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, ChevronDown } from 'lucide-react';
import { Sidebar } from './AdminDashboard';
import { bookingApi } from '../../services/api';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['ALL', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

const statusColor = {
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  CONFIRMED: 'bg-blue-100 text-blue-700 border-blue-200',
  IN_PROGRESS: 'bg-purple-100 text-purple-700 border-purple-200',
  COMPLETED: 'bg-green-100 text-green-700 border-green-200',
  CANCELLED: 'bg-red-100 text-red-700 border-red-200',
  NO_SHOW: 'bg-gray-100 text-gray-700 border-gray-200',
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const status = statusFilter === 'ALL' ? undefined : statusFilter;
      const res = await bookingApi.getAll(page, 10, status);
      setBookings(res.data?.content || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [page, statusFilter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await bookingApi.updateStatus(id, status);
      toast.success('Status updated!');
      fetchBookings();
      setSelected(null);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="/admin/bookings" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="font-syne text-3xl font-bold text-dark">Consultation Bookings</h1>
          <p className="text-gray-500 mt-1">Manage all incoming consultation requests</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 flex flex-wrap items-center gap-4">
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(0); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                  ${statusFilter === s
                    ? 'gradient-primary text-white border-transparent shadow-md'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-gray-400">
              <Calendar size={40} className="mx-auto mb-4 animate-pulse opacity-40" />
              Loading bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-16 text-center text-gray-400">
              <Calendar size={40} className="mx-auto mb-4 opacity-30" />
              No bookings found for this filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['#', 'Client', 'Contact', 'Service', 'Budget', 'City', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-gray-400 text-sm">#{b.id}</td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-dark text-sm">{b.fullName}</div>
                        <div className="text-gray-400 text-xs">{b.businessName}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-600">{b.email}</div>
                        <div className="text-xs text-gray-400">{b.phone}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm capitalize">
                        {b.serviceType?.replace(/-/g, ' ')}
                      </td>
                      <td className="px-4 py-4 text-gray-500 text-xs">{b.monthlyBudget || '—'}</td>
                      <td className="px-4 py-4 text-gray-500 text-xs">{b.city}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${statusColor[b.status] || ''}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-400 text-xs">
                        {b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={b.status}
                          onChange={e => handleStatusUpdate(b.id, e.target.value)}
                          className="text-xs border-2 border-gray-200 rounded-lg px-2 py-1.5 outline-none
                            focus:border-primary cursor-pointer bg-white"
                        >
                          {['PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED','NO_SHOW'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">Page {page + 1} of {totalPages}</p>
              <div className="flex gap-2">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 border rounded-xl text-sm disabled:opacity-40 hover:border-primary transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 gradient-primary text-white rounded-xl text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
