"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //  Get logged-in user
  const { data: session, status } = useSession();

  //  Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Handle loading + fallback
  const userEmail =
    status === "loading"
      ? "Loading..."
      : session?.user?.email || "No user";

  return (
    <div className="w-full h-16 bg-white border-b border-[#006E74]/10 flex items-center justify-between px-4 md:px-6 z-50">
      {/* Logo left */}
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#F35D2C] flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <span className="font-bold text-[#6B5E5E] text-lg hidden md:block">
          amsuite
        </span>
      </Link>

      {/* Right side: user menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 hover:bg-[#006E74]/5 px-3 py-2 rounded-lg transition"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#F35D2C]/10 flex items-center justify-center">
            <User size={16} className="text-[#F35D2C]" />
          </div>

          {/*  Dynamic Email */}
          <span className="text-sm text-[#6B5E5E] hidden md:inline">
            {userEmail}
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg shadow-[#006E74]/5 border border-[#006E74]/10 overflow-hidden z-50">
            
            {/* Settings */}
            <button className="hidden md:flex items-center gap-2 w-full px-4 py-3 text-sm text-white bg-[#006E74] hover:bg-[#004a4e]">
              <Settings size={16} />
              Settings
            </button>

            {/*  Sign Out */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-[#F35D2C] hover:bg-[#F35D2C]/5"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
