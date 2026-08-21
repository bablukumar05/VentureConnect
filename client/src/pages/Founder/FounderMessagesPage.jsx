import React from 'react';
import { ChatWindow } from '../../components/chat/ChatWindow';

export const FounderMessagesPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Direct Messages</h2>
        <p className="text-xs text-slate-400 mt-1">Real-time Socket.IO chat with investors and mentors.</p>
      </div>
      <ChatWindow />
    </div>
  );
};
