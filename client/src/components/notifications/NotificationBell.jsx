import React, { useState, useEffect } from 'react';
import { useNotificationStore } from '../../store/notificationStore';
import { getSocket } from '../../services/socket';
import { Bell, CheckCheck, CircleAlert, Sparkles, MessageSquare, Rocket, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationBell = () => {
  const { notifications, unreadCount, fetchNotifications, addNotification, markAllAsRead } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();

    const socket = getSocket();
    if (socket) {
      socket.on('new_notification', (notif) => {
        addNotification(notif);
      });
    }

    return () => {
      if (socket) socket.off('new_notification');
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition relative border border-slate-700/50"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Notifications</h4>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] text-indigo-400 hover:underline font-semibold"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/50">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">No new notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-3 text-xs transition ${n.isRead ? 'bg-slate-900/40' : 'bg-indigo-600/10'}`}
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold text-white">{n.title}</p>
                      <p className="text-slate-300 mt-0.5">{n.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
