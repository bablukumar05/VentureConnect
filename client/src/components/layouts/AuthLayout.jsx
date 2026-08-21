import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mb-6 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center font-bold text-white shadow-xl shadow-indigo-600/30">
            VC
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
            VentureConnect
          </span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        <Outlet />
      </div>
    </div>
  );
};
