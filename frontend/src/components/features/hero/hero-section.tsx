import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Crown, Users, Calendar, Heart, Building } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <Crown className="h-20 w-20 text-primary mx-auto mb-8 drop-shadow-lg" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Welcome to{' '}
            <br className="hidden sm:block" />
            <span className="text-primary">Agarwal Sabha</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect, celebrate, and grow with thousands of Agarwal families worldwide. 
            Your gateway to community, culture, and lifelong relationships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/register">Join Our Community</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center group hover:scale-105 transition-transform duration-200">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-4">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold text-foreground">10,000+</div>
                <div className="text-sm text-muted-foreground font-medium">Active Members</div>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-200">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-4">
                <Calendar className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground font-medium">Events Organized</div>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-200">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-4">
                <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold text-foreground">1,200+</div>
                <div className="text-sm text-muted-foreground font-medium">Successful Marriages</div>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-200">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-4">
                <Building className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold text-foreground">800+</div>
                <div className="text-sm text-muted-foreground font-medium">Businesses Listed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
