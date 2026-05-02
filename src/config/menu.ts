// src/config/menu.ts
import { LayoutDashboard, Users, Settings, Package, ShoppingCart, UserCircle } from "lucide-react";

export const MENU_ITEMS = {
  ADMIN: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "System Logs", href: "/admin/logs", icon: Settings },
    { label: "Inventory", href: "/admin/inventory", icon: Package },
    { label: "Revenue", href: "/admin/revenue", icon: ShoppingCart },
  ],
  MANAGER: [
    { label: "Dashboard", href: "/manager", icon: LayoutDashboard },
    { label: "Team Updates", href: "/manager/team", icon: Users },
    { label: "Reports", href: "/manager/reports", icon: Package },
    { label: "Settings", href: "/manager/settings", icon: Settings },
  ],
  USER: [
    { label: "My Profile", href: "/dashboard", icon: UserCircle },
    { label: "My Activities", href: "/dashboard/activities", icon: LayoutDashboard },
    { label: "Support", href: "/dashboard/support", icon: Settings },
  ],
};