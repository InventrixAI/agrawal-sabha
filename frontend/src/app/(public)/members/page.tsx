'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Users, MapPin, Building, Phone, Mail } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface Member {
  id: string
  firstName: string
  lastName: string
  gotra: string
  locality: string
  occupation?: string
  firm?: string
  profilePhoto?: string
  email?: string
  phone?: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with API call
    const mockMembers: Member[] = [
      {
        id: '1',
        firstName: 'Rajesh',
        lastName: 'Agarwal',
        gotra: 'Mittal',
        locality: 'Delhi',
        occupation: 'Business Owner',
        firm: 'Agarwal Enterprises',
        email: 'rajesh@example.com',
        phone: '+91 98765 43210'
      },
      {
        id: '2',
        firstName: 'Priya',
        lastName: 'Sharma',
        gotra: 'Bansal',
        locality: 'Mumbai',
        occupation: 'Software Engineer',
        firm: 'Tech Solutions',
        email: 'priya@example.com',
        phone: '+91 98765 43211'
      },
      {
        id: '3',
        firstName: 'Amit',
        lastName: 'Gupta',
        gotra: 'Goyal',
        locality: 'Bangalore',
        occupation: 'Doctor',
        firm: 'City Hospital',
        email: 'amit@example.com',
        phone: '+91 98765 43212'
      },
      {
        id: '4',
        firstName: 'Sunita',
        lastName: 'Jain',
        gotra: 'Jindal',
        locality: 'Pune',
        occupation: 'Teacher',
        firm: 'ABC School',
        email: 'sunita@example.com',
        phone: '+91 98765 43213'
      }
    ]
    
    setTimeout(() => {
      setMembers(mockMembers)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredMembers = members.filter(member =>
    member.firstName.toLowerCase().includes(search.toLowerCase()) ||
    member.lastName.toLowerCase().includes(search.toLowerCase()) ||
    member.gotra.toLowerCase().includes(search.toLowerCase()) ||
    member.locality.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto py-8 px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Members Directory</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with thousands of Agarwal families across the globe. 
              Find old friends, make new connections, and strengthen our community bonds.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, gotra, or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="md:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{members.length}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Building className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-muted-foreground">Gotras</div>
              </CardContent>
            </Card>
          </div>

          {/* Members Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.profilePhoto} />
                        <AvatarFallback>
                          {member.firstName[0]}{member.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {member.firstName} {member.lastName}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {member.gotra}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {member.locality}
                      </div>
                      
                      {member.occupation && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building className="h-4 w-4 mr-2" />
                          {member.occupation}
                          {member.firm && ` at ${member.firm}`}
                        </div>
                      )}
                      
                      {member.email && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2" />
                          {member.email}
                        </div>
                      )}
                      
                      {member.phone && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 mr-2" />
                          {member.phone}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Connect
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredMembers.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No members found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all members.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
