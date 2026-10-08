import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  Bell, 
  User, 
  LogOut, 
  SlidersHorizontal 
} from 'lucide-react';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="w-full h-16 bg-blue-600 text-white px-4 md:px-8 flex items-center justify-between shadow-md relative">
      
      {/* 1. Left: Brand Title */}
      <div className="flex items-center">
        <h3 className="text-2xl font-bold tracking-wide cursor-pointer">
          TRENDO
        </h3>
      </div>

      {/* 2. Middle: Search Bar with Icon on the Right */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative flex items-center w-full">
          <input
            type="search"
            placeholder="Search news, topics..."
            className="w-full py-2 pl-4 pr-10 text-gray-800 bg-white rounded-full outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <button 
            type="button" 
            aria-label="Search"
            className="absolute right-3 text-gray-500 hover:text-blue-600 transition"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. Right Side: Settings, Notifications, Profile DP */}
      <div className="flex items-center space-x-4">
        {/* Settings Icon */}
        <button className="p-2 hover:bg-blue-700 rounded-full transition" title="Settings">
          <Settings className="w-5 h-5" />
        </button>

        {/* Notification Bell with Badge */}
        <button className="p-2 hover:bg-blue-700 rounded-full transition relative" title="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-blue-600"></span>
        </button>

        {/* Profile Avatar & Modal Container */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center focus:outline-none ring-2 ring-white/50 rounded-full transition hover:ring-white"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover"
            />
          </button>

          {/* 4. Profile Dropdown Modal */}
          {isProfileOpen && (
            <>
              {/* Overlay to close modal on outside click */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsProfileOpen(false)} 
              />

              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 text-gray-800 z-20 py-2 transition-all">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-sm text-gray-900">Jane Doe</p>
                  <p className="text-xs text-gray-500 truncate">jane.doe@example.com</p>
                </div>

                {/* Modal Links */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Handle Edit Profile logic
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    Edit Profile
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Handle Settings logic
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-3 text-gray-500" />
                    Account Settings
                  </button>
                </div>

                {/* Logout Button */}
                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Handle Logout logic
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4 mr-3 text-red-500" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

