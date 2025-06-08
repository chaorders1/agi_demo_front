import { Header } from "@/components/header"
import { MainSection } from "@/components/main-section"
import { EventInfo } from "@/components/event-info"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center pt-8">
        <div className="w-full max-w-4xl mx-auto px-4">
          <MainSection />
        </div>
        
        {/* 水印工具入口 */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚀 Experience Full Watermark Tool
            </h2>
            <p className="text-gray-600 mb-6">
              Complete watermark solution based on backend API, supporting intelligent detection, batch processing, and high-precision watermark algorithms
            </p>
            <Link href="/watermark">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Enter Watermark Tool
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <EventInfo />
    </div>
  )
}
