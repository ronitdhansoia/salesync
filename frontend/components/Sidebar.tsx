"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings,
  LogOut,
  Send,
  UserCheck,
  Zap,
  Linkedin,
  Mail,
  Search,
  Bot,
  Shield
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "LinkedIn", href: "/linkedin", icon: Linkedin },
  { name: "Email Finder", href: "/email-finder", icon: Search },
  { name: "WhatsApp", href: "/whatsapp", icon: MessageSquare },
  { name: "Campaigns", href: "/campaigns", icon: Send },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Automation", href: "/automation", icon: Bot },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Compliance", href: "/compliance", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-[#7760F9] to-[#6651E8] p-2 rounded-xl">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">SaleSync</span>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-[#7760F9] to-[#6651E8] p-2 rounded-full">
            <UserCheck className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Demo User</p>
            <p className="text-xs text-gray-500 truncate">demo@salesync.in</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#7760F9] to-[#6651E8] text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <item.icon
                className={`
                  mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                `}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="px-3 py-4 space-y-1 border-t border-gray-200">
        <Link
          href="/settings"
          className={`
            group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
            ${
              pathname === "/settings"
                ? "bg-gradient-to-r from-[#7760F9] to-[#6651E8] text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          <Settings className={`
            mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200
            ${
              pathname === "/settings"
                ? "text-white"
                : "text-gray-400 group-hover:text-gray-600"
            }
          `} />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
          Logout
        </button>
      </div>

      {/* Pro Badge */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-[#7760F9] to-[#6651E8] rounded-lg p-4 text-white">
          <p className="text-sm font-semibold mb-1">Upgrade to Pro</p>
          <p className="text-xs opacity-90 mb-3">Unlock all features and remove limits</p>
          <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs font-medium py-2 px-3 rounded-md transition-all duration-200">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}