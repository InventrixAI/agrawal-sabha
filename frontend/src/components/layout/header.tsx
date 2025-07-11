'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Crown, Menu, User } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Crown className="h-6 w-6 text-primary" />
            <span className="font-bold">Agarwal Sabha</span>
          </Link>
        </div>

        <nav className="hidden md:flex mx-6 space-x-6">
          <Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/members" className="text-foreground/60 hover:text-foreground transition-colors">
            Members
          </Link>
          <Link href="/events" className="text-foreground/60 hover:text-foreground transition-colors">
            Events
          </Link>
          <Link href="/news" className="text-foreground/60 hover:text-foreground transition-colors">
            News
          </Link>
          <Link href="/matrimonial" className="text-foreground/60 hover:text-foreground transition-colors">
            Matrimonial
          </Link>
          <Link href="/business-directory" className="text-foreground/60 hover:text-foreground transition-colors">
            Business
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Join Us</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
