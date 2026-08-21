import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';
import { getSocket } from '../../services/socket';
import { Send, Paperclip, CheckCheck, Circle, Sparkles, FileText, User } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const ChatWindow = () => {
  const { user } = useAuthStore();
  const { conversations, activeConversation, messages, fetchConversations, setActiveConversation, addMessage, setTypingUser, typingUser } = useChatStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (activeConversation) {
      socket.emit('join_conversation', activeConversation._id);
    }

    const handleNewMessage = (msg) => {
      if (activeConversation && msg.conversation === activeConversation._id) {
        addMessage(msg);
      }
      fetchConversations();
    };

    const handleUserTyping = ({ conversationId, userName }) => {
      if (activeConversation && conversationId === activeConversation._id) {
        setTypingUser(userName);
      }
    };

    const handleStopTyping = ({ conversationId }) => {
      if (activeConversation && conversationId === activeConversation._id) {
        setTypingUser(null);
      }
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleStopTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleStopTyping);
    };
  }, [activeConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const socket = getSocket();
    const payload = {
      conversationId: activeConversation._id,
      senderId: user._id,
      text: inputText.trim(),
      messageType: 'text',
    };

    if (socket) {
      socket.emit('send_message', payload);
      socket.emit('stop_typing', { conversationId: activeConversation._id, userId: user._id });
    }

    setInputText('');
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    const socket = getSocket();
    if (socket && activeConversation) {
      socket.emit('typing', {
        conversationId: activeConversation._id,
        userId: user._id,
        userName: user.name,
      });
    }
  };

  const getOtherParticipant = (conv) => {
    if (!conv || !conv.participants) return null;
    return conv.participants.find((p) => p._id !== user._id) || conv.participants[0];
  };

  const otherUser = getOtherParticipant(activeConversation);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[680px]">
      {/* Conversations List Panel */}
      <div className="border-r border-slate-800 flex flex-col bg-slate-950/60">
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-bold text-white text-base">Direct Messages</h3>
          <p className="text-xs text-slate-400">Real-time Socket.IO Connection</p>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-800/40">
          {conversations.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No conversations yet. Discover investors/mentors to initiate chat.
            </div>
          ) : (
            conversations.map((conv) => {
              const other = getOtherParticipant(conv);
              const isSelected = activeConversation?._id === conv._id;
              return (
                <button
                  key={conv._id}
                  onClick={() => setActiveConversation(conv)}
                  className={`w-full p-3.5 text-left flex items-start gap-3 transition ${
                    isSelected ? 'bg-indigo-600/10 border-l-4 border-indigo-500' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shrink-0 relative">
                    {other?.name?.charAt(0) || 'U'}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white truncate">{other?.name || 'User'}</p>
                      <span className="text-[10px] text-slate-500">{formatDate(conv.lastMessageAt)}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage || 'Click to open chat'}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Panel */}
      <div className="md:col-span-2 flex flex-col h-full bg-slate-900">
        {activeConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300">
                  {otherUser?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{otherUser?.name}</h4>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <Circle className="w-2 h-2 fill-emerald-400" /> Active Now
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/30">
              {messages.map((msg) => {
                const isMe = msg.sender?._id === user._id || msg.sender === user._id;
                return (
                  <div
                    key={msg._id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-md ${
                        isMe
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/50'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">
                      {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                );
              })}

              {typingUser && (
                <div className="text-xs text-slate-400 italic flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>{typingUser} is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-900 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder={`Message ${otherUser?.name || ''}...`}
                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-3">
            <User className="w-12 h-12 text-slate-700" />
            <p className="text-sm font-medium text-slate-400">Select a conversation to start messaging in real-time</p>
          </div>
        )}
      </div>
    </div>
  );
};
