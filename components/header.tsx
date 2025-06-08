"use client"

import Link from "next/link"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-white/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 animate-fade-in">
          <div className="relative">
            <Shield className="h-8 w-8 text-purple-600 animate-pulse-slow" />
            <div className="absolute inset-0 h-8 w-8 text-purple-400 animate-ping opacity-20">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              WatermarkGuard
            </span>
            <span className="text-xs text-gray-500">by SocialNetwork0, Inc.</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {["About"].map((item, index) => (
            <Link
              key={item}
              href="#"
              className="text-sm text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-105 relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-white/20 animate-slide-up">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {["About"].map((item) => (
              <Link
                key={item}
                href="#"
                className="block py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
