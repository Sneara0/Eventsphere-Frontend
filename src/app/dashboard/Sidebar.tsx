"use client"
import Link from 'next/link'
import { LayoutDashboard, Users, Settings, ShieldCheck, History, User } from 'lucide-react'

const MENU_CONFIG = {
  ADMIN: [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'Event Controls', path: '/admin/events', icon: Settings },
    { name: 'System Logs', path: '/admin/logs', icon: ShieldCheck },
    { name: 'Revenue', path: '/admin/revenue', icon: History },
  ],
  MANAGER: [
    { name: 'Dashboard', path: '/manager', icon: LayoutDashboard },
    { name: 'Approvals', path: '/manager/approvals', icon: ShieldCheck },
    { name: 'Team Update', path: '/manager/team', icon: Users },
    { name: 'Reports', path: '/manager/reports', icon: History },
  ],
  USER: [
    { name: 'My Events', path: '/dashboard', icon: LayoutDashboard },
    { name: 'History', path: '/dashboard/history', icon: History },
    { name: 'Profile', path: '/profile', icon: User },
  ]
}

export default function Sidebar({ role }: { role: 'ADMIN' | 'MANAGER' | 'USER' }) {
  const menuItems = MENU_CONFIG[role]

  return (
    <aside className="w-64 border-r bg-background h-screen sticky top-0 p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-all group">
            <item.icon size={20} className="group-hover:text-primary" />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}