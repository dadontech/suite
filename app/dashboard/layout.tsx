'use client'

import { useState } from 'react';
import Sidebar from '@/app/components/sidebar';    
import Navbar from '@/app/components/navdashboard';      

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex bg-white">
      {/* Sidebar - fixed on left (hidden on mobile, replaced by bottom nav) */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* Main area: contains fixed navbar + scrollable content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar - fixed at top */}
        <header 
          className={`fixed top-0 h-16 bg-white border-b border-[#006E74]/10 flex items-center px-6 z-10 transition-all duration-300 ${
            isCollapsed 
              ? 'md:left-20 md:w-[calc(100%-5rem)]' 
              : 'md:left-64 md:w-[calc(100%-16rem)]'
          }`}
          style={{ left: 0, width: '100%' }}
        >
          <Navbar />
        </header>

        {/* Page content - scrollable, with top padding for navbar */}
        <main 
          className={`flex-1 overflow-y-auto mt-16 p-6 transition-all duration-300 ${
            isCollapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}