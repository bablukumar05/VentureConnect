import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';
import { FileSpreadsheet, Shield } from 'lucide-react';

export const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get('/admin/audit-logs');
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (isLoading) return <LoadingSpinner label="Fetching Security Audit Logs..." />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-red-400" /> Platform Security & Activity Audit Logs
        </h2>
        <p className="text-xs text-slate-400 mt-1">Immutable track of administrative operations and system events.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="pb-3">Admin</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Resource</th>
                <th className="pb-3">Log Details</th>
                <th className="pb-3">IP Address</th>
                <th className="pb-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 font-semibold text-white">{log.admin?.name || 'Admin'}</td>
                  <td className="py-3">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300">{log.targetResource}</td>
                  <td className="py-3 text-slate-400">{log.details}</td>
                  <td className="py-3 text-slate-500 font-mono">{log.ipAddress || '127.0.0.1'}</td>
                  <td className="py-3 text-slate-500">{formatDate(log.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
