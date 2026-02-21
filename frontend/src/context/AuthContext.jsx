import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('digigrow_token');
    const savedUser = localStorage.getItem('digigrow_user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    const api = res.data;
    if (!api || api.success === false) {
      throw new Error(api?.message || 'Login failed');
    }
    const payload = api.data ?? api; // fallback if api already raw
    const { token, ...userData } = payload;
    if (!token) throw new Error('No token returned from server');
    // const { token, ...userData } = res.data;
    localStorage.setItem('digigrow_token', token);
    localStorage.setItem('digigrow_user', JSON.stringify(userData));
    setUser(userData);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('digigrow_token');
    localStorage.removeItem('digigrow_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
