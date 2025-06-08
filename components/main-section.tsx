"use client"

import { Shield, Zap, Lock, Users, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MainSection() {
  return (
    <div className="pt-12 pb-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            WatermarkGuard
          </h1>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-glow"></div>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Advanced AI-powered watermark detection and removal solution
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link href="/watermark">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg">
              Try Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          {
            icon: Shield,
            title: "AI Detection",
            description: "Advanced machine learning algorithms for precise watermark detection"
          },
          {
            icon: Zap,
            title: "Fast Processing",
            description: "Lightning-fast processing with optimized algorithms"
          },
          {
            icon: Lock,
            title: "Secure & Private",
            description: "Your images are processed securely and never stored"
          },
          {
            icon: Users,
            title: "Batch Processing",
            description: "Process multiple images simultaneously for efficiency"
          }
        ].map((feature, index) => (
          <div 
            key={feature.title}
            className="text-center p-6 rounded-2xl glass-effect hover:shadow-lg transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
              <feature.icon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { number: "99.9%", label: "Detection Accuracy" },
            { number: "< 2s", label: "Average Processing Time" },
            { number: "10M+", label: "Images Processed" }
          ].map((stat, index) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Upload Image",
              description: "Upload your image with watermarks that need to be removed"
            },
            {
              step: "2", 
              title: "AI Analysis",
              description: "Our AI analyzes and detects watermarks with high precision"
            },
            {
              step: "3",
              title: "Download Result",
              description: "Get your clean image without watermarks in seconds"
            }
          ].map((step, index) => (
            <div 
              key={step.step}
              className="relative animate-fade-in"
              style={{ animationDelay: `${1.4 + index * 0.2}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-full w-full">
                  <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white animate-fade-in" style={{ animationDelay: '2s' }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Remove Watermarks?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of users who trust WatermarkGuard for their image processing needs
        </p>
        <Link href="/watermark">
          <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
