'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface User {
  id: string
  email: string
  role: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: any) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  register: (data: any) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  const login = async (credentials: any) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials)
      
      if (response.data.success) {
        const { user: userData, token } = response.data.data
        
        // Store token
        localStorage.setItem('token', token)
        
        // Set user
        setUser({
          id: userData.id,
          email: userData.email,
          role: userData.role,
          name: userData.member?.firstName + ' ' + userData.member?.lastName || userData.email
        })
        
        return { success: true }
      }
      
      return { success: false, error: response.data.message }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const register = async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data)
      
      if (response.data.success) {
        const { user: userData, token } = response.data.data
        
        // Store token
        localStorage.setItem('token', token)
        
        // Set user
        setUser({
          id: userData.id,
          email: userData.email,
          role: userData.role,
          name: userData.member?.firstName + ' ' + userData.member?.lastName || userData.email
        })
        
        return { success: true }
      }
      
      return { success: false, error: response.data.message }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token with backend
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // You can add token verification here
    }
    setIsLoading(false)
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
