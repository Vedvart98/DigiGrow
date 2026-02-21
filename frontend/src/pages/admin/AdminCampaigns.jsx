import { useState, useEffect } from 'react';
import { Megaphone, Plus, TrendingUp } from 'lucide-react';
import { Sidebar } from './AdminDashboard';
import { campaignApi } from '../../services/api';
import toast from 'react-hot-toast';

const PLATFORMS = ['ALL', 'GOOGLE_ADS', 'FACEBOOK', 'INSTAGRAM', 'YOUTUBE', 'LINKEDIN', 'TWITTER'];

const platformEmoji = {
  GOOGLE_ADS: '🔍', FACEBOOK: '📘', INSTAGRAM: '📸',
  YOUTUBE: '📺', LINKEDIN: '💼', TWITTER: '✖️',
};

const statusColor = {
  DRAFT: 'bg-gray-100 text-gray-600',
  ACTIVE: 'bg-green-100 text-green-700',
  PAUSED: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platformFilter, setPlatformFilter] = useState('ALL');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    clientName: '', clientEmail: '', businessName: '',
    platform: 'GOOGLE_ADS', campaignType: 'SEARCH',
    targetLocation: 'Delhi, India', budgetMonthly: '',
    campaignObjective: 'LEADS',
  });

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const params = platformFilter !== 'ALL' ? { platform: platformFilter } : {};
      const res = await campaignApi.getAll(page, 10, params);
      setCampaigns(res.data?.content || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch {
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCampaigns(); }, [page, platformFilter]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await campaignApi.create(newCampaign);
      toast.success('Campaign created!');
      setShowForm(false);
      setNewCampaign({ clientName: '', clientEmail: '', businessName: '', platform: 'GOOGLE_ADS', campaignType: 'SEARCH', targetLocation: 'Delhi, India', budgetMonthly: '', campaignObjective: 'LEADS' });
      fetchCampaigns();
    } catch {
      toast.error('Failed to create campaign');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await campaignApi.updateStatus(id, status);
      toast.success('Campaign status updated');
      fetchCampaigns();
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="/admin/campaigns" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-syne text-3xl font-bold text-dark">Ad Campaigns</h1>
            <p className="text-gray-500 mt-1">Manage all advertising campaigns across platforms</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="gradient-primary text-white px-5 py-3 rounded-xl font-semibold
              flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Plus size={18} /> New Campaign
          </button>
        </div>

        {/* Create Campaign Form */}
        {showForm && (
          <form onSubmit={handleCreate} className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <h2 className="font-syne text-xl font-bold mb-6">Create New Campaign</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { label: 'Client Name', key: 'clientName', type: 'text', required: true },
                { label: 'Client Email', key: 'clientEmail', type: 'email', required: true },
                { label: 'Business Name', key: 'businessName', type: 'text', required: true },
                { label: 'Target Location', key: 'targetLocation', type: 'text' },
                { label: 'Monthly Budget (₹)', key: 'budgetMonthly', type: 'number' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={newCampaign[field.key]}
                    onChange={e => setNewCampaign({...newCampaign, [field.key]: e.target.value})}
                    className="w-full border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-3 text-sm outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Platform</label>
                <select
                  value={newCampaign.platform}
                  onChange={e => setNewCampaign({...newCampaign, platform: e.target.value})}
                  className="w-full border-2 border-gray-200 focus:border-primary rounded-xl px-4 py-3 text-sm outline-none bg-white"
                >
                  {['GOOGLE_ADS','FACEBOOK','INSTAGRAM','YOUTUBE','LINKEDIN','TWITTER'].map(p => (
                    <option key={p} value={p}>{platformEmoji[p]} {p.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="submit" className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold">
                Create Campaign
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="border-2 border-gray-200 px-6 py-3 rounded-xl text-gray-600 font-semibold hover:border-gray-300">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Platform Filter */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 flex flex-wrap gap-2">
          {PLATFORMS.map(p => (
            <button
              key={p}
              onClick={() => { setPlatformFilter(p); setPage(0); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                ${platformFilter === p
                  ? 'gradient-primary text-white border-transparent'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary'
                }`}
            >
              {platformEmoji[p] || ''} {p === 'ALL' ? 'All Platforms' : p.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-gray-400">
              <Megaphone size={40} className="mx-auto mb-4 animate-pulse opacity-40" />
              Loading campaigns...
            </div>
          ) : campaigns.length === 0 ? (
            <div className="p-16 text-center text-gray-400">
              <Megaphone size={40} className="mx-auto mb-4 opacity-30" />
              <p>No campaigns found. Create your first campaign!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Client', 'Business', 'Platform', 'Budget/mo', 'Impressions', 'Clicks', 'CTR', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {campaigns.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-dark text-sm">{c.clientName}</div>
                        <div className="text-gray-400 text-xs">{c.clientEmail}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">{c.businessName}</td>
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-1 text-sm">
                          {platformEmoji[c.platform]} {c.platform?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm font-medium">
                        {c.budgetMonthly ? `₹${Number(c.budgetMonthly).toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">
                        {c.impressions?.toLocaleString() || '0'}
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">
                        {c.clicks?.toLocaleString() || '0'}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <TrendingUp size={14} />
                          {c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : '0.00'}%
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor[c.status] || ''}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={c.status}
                          onChange={e => handleStatusChange(c.id, e.target.value)}
                          className="text-xs border-2 border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-primary bg-white"
                        >
                          {['DRAFT','ACTIVE','PAUSED','COMPLETED','CANCELLED'].map(s => (
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
        </div>
      </main>
    </div>
  );
}
