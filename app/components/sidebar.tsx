// Sidebar.tsx
'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Link as LinkIcon,
  FileText,
  GitBranch,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
  { icon: LinkIcon, label: 'New Campaign', href: '/dashboard/campaign' },
  { icon: FileText, label: 'Content', href: '/dashboard/content' },
  { icon: GitBranch, label: 'Funnels', href: '/dashboard/funnels' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar – hidden on mobile */}
      <div
        className={`hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-[#006E74]/10 transition-all duration-300 flex-col ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="h-16 px-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F35D2C] flex items-center justify-center">
            <Zap className="text-white fill-white" size={20} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-[#6B5E5E] leading-tight text-lg">Amsuite</h1>
            </div>
          )}
        </div>

        <hr className="border-[#006E74]/10 mb-4" />

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative group w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  active
                    ? 'bg-[#F35D2C] text-white'
                    : 'text-[#6B5E5E]/70 hover:bg-[#006E74]/5'
                }`}
              >
                <item.icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
                {isCollapsed && (
                  <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#6B5E5E] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="m-4 p-4 rounded-2xl bg-[#F35D2C]/5 border border-[#F35D2C]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-[#F35D2C]">
                <Zap size={16} />
              </div>
              <span className="font-bold text-[#6B5E5E] text-sm">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-[#6B5E5E]/70 mb-4">
              Unlock unlimited campaigns & advanced AI features
            </p>
            <button className="w-full py-2.5 rounded-xl bg-[#F35D2C] text-white font-semibold text-sm hover:bg-[#e04e1f] transition-colors">
              Upgrade Now
            </button>
          </div>
        )}

        <button
          onClick={onToggle}
          className="p-4 flex items-center justify-center gap-2 text-[#6B5E5E]/40 hover:text-[#F35D2C] border-t border-[#006E74]/10 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <>
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Bottom Navigation – visible only on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#006E74]/10 flex items-center justify-around py-2 px-2 z-50">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                active ? 'text-[#F35D2C]' : 'text-[#6B5E5E]/70 hover:text-[#F35D2C]'
              }`}
            >
              <item.icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;