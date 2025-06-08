"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Search, Shield, ImageIcon } from "lucide-react"

export function DemoSection() {
  const [activeTab, setActiveTab] = useState("detect")
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
      setResult(null)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      if (activeTab === "detect") {
        setResult(Math.random() > 0.5 ? "Invisible watermark detected" : "No watermark found")
      } else {
        setResult("Watermark successfully embedded")
      }
    }, 2000)
  }

  return (
    <Card className="p-6 bg-gray-50 border-gray-200">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="detect" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Detect Watermark
          </TabsTrigger>
          <TabsTrigger value="embed" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Add Watermark
          </TabsTrigger>
        </TabsList>

        <TabsContent value="detect" className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Upload Image to Detect Watermarks</h3>
            <p className="text-gray-600 text-sm mb-4">Our AI will analyze your image for invisible watermarks</p>
          </div>
        </TabsContent>

        <TabsContent value="embed" className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Add Invisible Watermark</h3>
            <p className="text-gray-600 text-sm mb-4">Protect your images with undetectable watermarks</p>
          </div>

          {activeTab === "embed" && (
            <div className="mb-4 space-y-3">
              <label className="block text-sm font-medium">Enter your watermark text:</label>
              <input
                type="text"
                placeholder="Type your watermark text here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                maxLength={100}
              />
              <div className="text-xs text-gray-500">
                <span className="font-medium">Try these examples:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors">
                    © 2024 John Smith
                  </button>
                  <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors">
                    Created by @username
                  </button>
                  <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors">
                    Property of MyCompany
                  </button>
                  <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors">
                    Licensed for commercial use
                  </button>
                  <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors">
                    Contact: info@example.com
                  </button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-emerald-400 bg-emerald-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploadedImage ? (
            <div className="space-y-4">
              <Image
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded"
                width={400}
                height={192}
                className="max-w-full max-h-48 mx-auto rounded-lg shadow-sm"
              />
              <div className="flex flex-col gap-2">
                <Button onClick={analyzeImage} disabled={isAnalyzing} className="bg-emerald-600 hover:bg-emerald-700">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {activeTab === "detect" ? "Analyzing..." : "Embedding..."}
                    </>
                  ) : (
                    <>
                      {activeTab === "detect" ? (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Detect Watermark
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Add Watermark
                        </>
                      )}
                    </>
                  )}
                </Button>

                {result && (
                  <div
                    className={`p-3 rounded-lg text-sm font-medium ${
                      result.includes("detected") || result.includes("successfully")
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {result}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-gray-600 mb-2">Drag and drop your image here, or</p>
                <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </span>
                  </Button>
                </label>
              </div>
              <p className="text-xs text-gray-500">Supports JPG, PNG, WebP up to 10MB</p>
            </div>
          )}
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            {activeTab === "detect"
              ? "Advanced algorithms detect even the most sophisticated invisible watermarks"
              : "Your watermarks are embedded using military-grade steganography"}
          </p>
        </div>
      </Tabs>
    </Card>
  )
}
