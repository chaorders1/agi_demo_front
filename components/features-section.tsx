import { Check } from "lucide-react"

export function FeaturesSection() {
  const features = [
    "Industry-leading invisible watermark detection",
    "Advanced steganography protection methods",
    "Batch processing for multiple images",
    "Custom watermark embedding options",
    "Real-time detection and analysis",
    "Enterprise-grade security and privacy",
  ]

  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </div>
  )
}
