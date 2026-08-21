import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Users, Shield, Lock, Unlock, CheckCircle2 } from 'lucide-react';

export const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await API.put('/admin/user-status', { userId, isActive: !currentStatus });
      setUsers(users.map((u) => (u._id === userId ? { ...u, isActive: !currentStatus } : u)));
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading User Directory..." />;

  const filteredUsers = roleFilter ? users.filter((u) => u.role === roleFilter) : users;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-red-400" /> User Management & RBAC Control
          </h2>
          <p className="text-xs text-slate-400 mt-1">Approve, deactivate, or block user accounts across all 4 roles.</p>
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:border-red-500 focus:outline-none"
        >
          <option value="">All User Roles</option>
          <option value="founder">Founders</option>
          <option value="investor">Investors</option>
          <option value="mentor">Mentors</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 font-semibold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-indigo-400">
                      {user.name?.charAt(0)}
                    </div>
                    {user.name}
                  </td>
                  <td className="py-3 text-slate-300">{user.email}</td>
                  <td className="py-3">
                    <span className="capitalize font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3">
                    {user.isActive ? (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        Blocked
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleToggleStatus(user._id, user.isActive)}
                      className={`px-3 py-1 rounded-lg font-bold text-[10px] flex items-center gap-1 transition ${
                        user.isActive
                          ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {user.isActive ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                      {user.isActive ? 'Block User' : 'Activate User'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
