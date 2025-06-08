import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-16 pb-8">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          More than watermark detection.
          <br />
          <span className="text-emerald-600">Protect what&apos;s yours.</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Advanced invisible watermark technology to detect hidden marks in images and protect your digital content with
          undetectable watermarks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
            Start Protecting Content
          </Button>
          <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8">
            Try Detection Tool
          </Button>
        </div>
      </div>
    </section>
  )
}
