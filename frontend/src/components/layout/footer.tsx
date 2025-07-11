import React from 'react'
import Link from 'next/link'
import { Crown, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Agarwal Sabha</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Preserving heritage, building community. Connecting Agarwal families worldwide through tradition and innovation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">Events</Link></li>
              <li><Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">News</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">Gallery</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/members" className="text-muted-foreground hover:text-foreground transition-colors">Members Directory</Link></li>
              <li><Link href="/matrimonial" className="text-muted-foreground hover:text-foreground transition-colors">Matrimonial</Link></li>
              <li><Link href="/business-directory" className="text-muted-foreground hover:text-foreground transition-colors">Business Directory</Link></li>
              <li><Link href="/hall-booking" className="text-muted-foreground hover:text-foreground transition-colors">Hall Booking</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@agarwalsabha.com</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Community Hall, Delhi</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center text-sm text-muted-foreground">
              © 2024 Agarwal Sabha Platform. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
