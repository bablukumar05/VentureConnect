import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Sidebar } from '../common/Sidebar';
import { MobileNav } from '../common/MobileNav';

export const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar />

        {/* Mobile Drawer Backdrop & Menu */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-slate-900 h-full border-r border-slate-800 p-4 z-10 flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
                <span className="font-bold text-white text-base">Navigation</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div onClick={() => setMobileSidebarOpen(false)}>
                <Sidebar isMobile />
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
};
