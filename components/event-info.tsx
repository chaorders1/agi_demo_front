"use client"

import Image from "next/image"
import { Calendar, Clock, MapPin, ExternalLink, Shield } from "lucide-react"
import { useState } from "react"

export function EventInfo() {
  const [clickedSponsor, setClickedSponsor] = useState<string | null>(null)

  const sponsors = [
    {
      name: "TRAE",
      url: "https://www.trae.ai/",
    },
    { 
      name: "OpusClip", 
      url: "https://www.opus.pro" 
    },
    { 
      name: "hedra", 
      url: "https://www.hedra.com" 
    },
  ]

  const handleSponsorClick = (sponsor: { name: string; url: string }) => {
    setClickedSponsor(sponsor.name)
    
    // 创建撒花效果
    createConfetti()
    
    // 延迟跳转，让用户看到动画效果
    setTimeout(() => {
      window.open(sponsor.url, '_blank', 'noopener,noreferrer')
      setClickedSponsor(null)
    }, 2500)
  }

  const createConfetti = () => {
    const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']
    const confettiCount = 80
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.style.position = 'fixed'
      confetti.style.left = Math.random() * 100 + 'vw'
      confetti.style.top = '-10px'
      confetti.style.width = '12px'
      confetti.style.height = '12px'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = '50%'
      confetti.style.pointerEvents = 'none'
      confetti.style.zIndex = '9999'
      confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`
      
      document.body.appendChild(confetti)
      
      // 清理动画元素
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti)
        }
      }, 5000)
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes sponsor-click {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        .sponsor-clicked {
          animation: sponsor-click 0.3s ease-in-out;
        }
      `}</style>
      
      <footer className="bg-gradient-to-br from-gray-50 to-purple-50 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-3 animate-slide-up">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative h-48 rounded-lg overflow-hidden bg-white">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tzjynpZhROXZB3Dfp33PidmRTcn5TK.png"
                      alt="Vibe Coding Summit"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-xs font-medium opacity-90">Experience the Future of AI</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 italic">&quot;Where innovation meets creativity in the digital age&quot;</p>
                </div>
              </div>

              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Vibe Coding Summit
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Join us for an exclusive coding summit featuring the latest in AI and watermark technology. Connect
                    with industry leaders and innovators shaping the future of digital content protection.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="p-1.5 bg-purple-100 rounded-md">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="font-medium text-sm">June 7th, 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="p-1.5 bg-blue-100 rounded-md">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm">10:00 AM PST</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="p-1.5 bg-indigo-100 rounded-md">
                      <MapPin className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="font-medium text-sm">AGI House</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Proudly Sponsored By:</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {sponsors.map((sponsor, index) => (
                      <button
                        key={sponsor.name}
                        onClick={() => handleSponsorClick(sponsor)}
                        className={`
                          bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                          px-3 py-1.5 rounded-md text-xs font-bold 
                          hover:from-purple-700 hover:to-blue-700 
                          transition-all duration-300 hover:scale-105 
                          inline-flex items-center gap-1 cursor-pointer
                          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                          ${clickedSponsor === sponsor.name ? 'sponsor-clicked' : ''}
                        `}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        disabled={clickedSponsor === sponsor.name}
                      >
                        {sponsor.name}
                        <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-purple-600" />
                <span className="text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SocialNetwork0, Inc.
                </span>
              </div>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                Pioneering the future of digital content protection with advanced invisible watermarking technology.
              </p>
              <div className="text-xs text-gray-500">© 2024 SocialNetwork0, Inc. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
