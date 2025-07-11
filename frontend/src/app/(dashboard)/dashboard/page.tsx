'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar, Heart, Building, TrendingUp, Star } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening in your community today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href="/profile">Edit Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Connections
                </p>
                <p className="text-2xl font-bold">234</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12 this week
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Upcoming Events
                </p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  Next: Tomorrow
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Profile Views
                </p>
                <p className="text-2xl font-bold">89</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1" />
                  This month
                </p>
              </div>
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Business Views
                </p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <Building className="h-3 w-3 mr-1" />
                  +23 this week
                </p>
              </div>
              <Building className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest community interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Registered for Maharaja Agrasen Jayanti</p>
                  <p className="text-xs text-muted-foreground">September 15, 2024 • Community Hall</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              
              <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Users className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Profile viewed by 12 members</p>
                  <p className="text-xs text-muted-foreground">Members from Delhi and Mumbai showed interest</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Heart className="h-5 w-5 text-pink-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm">New matrimonial interest received</p>
                  <p className="text-xs text-muted-foreground">Compatible profile from Bansal gotra</p>
                  <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you're registered for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Maharaja Agrasen Jayanti</h4>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Confirmed</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Sept 15, 2024 • 6:00 PM</p>
                <p className="text-xs text-muted-foreground">Community Hall, Delhi</p>
                <Button size="sm" variant="outline" className="w-full mt-3">View Details</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Diwali Celebration</h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Registered</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Oct 28, 2024 • 7:00 PM</p>
                <p className="text-xs text-muted-foreground">Grand Ballroom, Mumbai</p>
                <Button size="sm" variant="outline" className="w-full mt-3">View Details</Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2" asChild>
              <Link href="/members">
                <Users className="h-6 w-6" />
                <span className="text-sm">Find Members</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2" asChild>
              <Link href="/matrimonial">
                <Heart className="h-6 w-6" />
                <span className="text-sm">Matrimonial</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2" asChild>
              <Link href="/business-directory">
                <Building className="h-6 w-6" />
                <span className="text-sm">Business Directory</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2" asChild>
              <Link href="/hall-booking">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Book Hall</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
