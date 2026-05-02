"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  Bell, 
  Search,
  Users, // Admin এর জন্য
  ShieldCheck, // Manager এর জন্য
  History // User এর জন্য
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './ModeToggle' 

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) 
  
  // উদাহরণস্বরূপ রোল সেট করা (এটি পরে Clerk/Auth থেকে আসবে)
  const [userRole, setUserRole] = useState<'ADMIN' | 'MANAGER' | 'USER'>('ADMIN') 

  // পাবলিক রুটস
  const publicRoutes = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  // রোল অনুযায়ী ড্যাশবোর্ড মেনু কনফিগ
  const dashboardMenu = {
    ADMIN: [
      { name: 'Overview', path: '/admin', icon: LayoutDashboard },
      { name: 'Manage Users', path: '/admin/users', icon: Users },
      { name: 'Event Controls', path: '/admin/events', icon: Settings },
      { name: 'System Logs', path: '/admin/logs', icon: ShieldCheck },
      { name: 'Revenue', path: '/admin/revenue', icon: Search },
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
      { name: 'Profile Settings', path: '/profile', icon: User },
    ]
  }

  const routes = isLoggedIn ? publicRoutes : publicRoutes

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. Logo */}
        <Link href="/" className="text-2xl font-bold text-primary tracking-tighter">
          EVENT<span className="text-foreground">FLOW</span>
        </Link>

        {/* 2. Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {routes.map((route) => (
            <Link 
              key={route.path} 
              href={route.path}
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              {route.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* 3. Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary/10 hover:border-primary/50 transition-all">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 mt-2 p-2">
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="text-sm font-bold uppercase tracking-tighter">My Account</span>
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{userRole} ROLE</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* ড্রপডাউনে রোল অনুযায়ী ডায়নামিক মেনু */}
                  {dashboardMenu[userRole].map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link href={item.path} className="flex w-full cursor-pointer py-2">
                        <item.icon className="mr-2 h-4 w-4" /> {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex w-full cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> Account Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-full px-6 shadow-md hover:shadow-primary/20 transition-all">
                  Join Now
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* 4. Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          <button 
            className="p-2 text-foreground rounded-md hover:bg-muted" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 5. Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link 
                key={route.path} 
                href={route.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors border-b border-muted pb-2"
              >
                {route.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            {isLoggedIn ? (
              <>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{userRole} Dashboard</p>
                <div className="grid grid-cols-1 gap-2">
                   {dashboardMenu[userRole].map((item) => (
                      <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start gap-2 h-11">
                          <item.icon className="h-4 w-4" /> {item.name}
                        </Button>
                      </Link>
                   ))}
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start gap-2 mt-4"
                  onClick={() => {setIsLoggedIn(false); setIsOpen(false);}}
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Join Now</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}