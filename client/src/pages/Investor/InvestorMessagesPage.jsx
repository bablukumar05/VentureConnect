import React from 'react';
import { ChatWindow } from '../../components/chat/ChatWindow';

export const InvestorMessagesPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Investor Messages</h2>
        <p className="text-xs text-slate-400 mt-1">Real-time Socket.IO chat with founders.</p>
      </div>
      <ChatWindow />
    </div>
  );
};
