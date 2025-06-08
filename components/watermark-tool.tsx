'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useWatermark } from '@/hooks/useWatermark';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, Search, Scan, Check, AlertCircle } from 'lucide-react';

export const WatermarkTool: React.FC = () => {
  const { loading, error, result, addWatermark, detectWatermark, scanWatermarks, getSuggestedLength, clearResults } = useWatermark();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [detectText, setDetectText] = useState('');
  const [lengthSuggestion, setLengthSuggestion] = useState<string>('');
  const [activeTab, setActiveTab] = useState('add');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-get length suggestion when user inputs watermark text
  useEffect(() => {
    if (watermarkText.trim()) {
      getSuggestedLength(watermarkText).then(suggestion => {
        if (suggestion) {
          setLengthSuggestion(`🧠 Recommended length: ${suggestion.recommendedLength} characters`);
        }
      });
    } else {
      setLengthSuggestion('');
    }
  }, [watermarkText, getSuggestedLength]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size cannot exceed 10MB');
        return;
      }
      
      setSelectedFile(file);
      clearResults();
    }
  };

  const handleAddWatermark = async () => {
    if (!selectedFile || !watermarkText.trim()) {
      alert('Please select an image file and enter watermark text');
      return;
    }

    try {
      await addWatermark(selectedFile, watermarkText.trim());
    } catch {
      // Error handled in hook
    }
  };

  const handleDetectWatermark = async () => {
    if (!selectedFile || !detectText.trim()) {
      alert('Please select an image file and enter watermark text to detect');
      return;
    }

    try {
      await detectWatermark(selectedFile, detectText.trim());
    } catch {
      // Error handled in hook
    }
  };

  const handleScanWatermarks = async () => {
    if (!selectedFile) {
      alert('Please select an image file');
      return;
    }

    try {
      await scanWatermarks(selectedFile);
    } catch {
      // Error handled in hook
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🔒</span>
            </div>
            Watermark Tool
          </CardTitle>
          <CardDescription>
            Add invisible watermarks to images, or detect and scan watermark content in images
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* File selection area */}
          <div className="mb-6">
            <Label htmlFor="file-upload" className="text-base font-medium">
              Select Image File
            </Label>
            <div className="mt-2">
              <div
                onClick={triggerFileSelect}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer transition-colors"
              >
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Selected: {selectedFile.name}
                    </span>
                    <Badge variant="secondary">
                      {(selectedFile.size / 1024 / 1024).toFixed(1)}MB
                    </Badge>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Click to select image file
                    </span>
                    <span className="text-xs text-gray-400">
                      Supports PNG, JPG, JPEG, BMP formats, max 10MB
                    </span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Function tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Add Watermark
              </TabsTrigger>
              <TabsTrigger value="detect" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Detect Watermark
              </TabsTrigger>
              <TabsTrigger value="scan" className="flex items-center gap-2">
                <Scan className="w-4 h-4" />
                Scan Watermarks
              </TabsTrigger>
            </TabsList>

            {/* Add watermark */}
            <TabsContent value="add" className="space-y-4">
              <div>
                <Label htmlFor="watermark-text">Watermark Text</Label>
                <Input
                  id="watermark-text"
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark content to add"
                  className="mt-1"
                />
                {lengthSuggestion && (
                  <p className="text-sm text-gray-600 mt-1">
                    {lengthSuggestion}
                  </p>
                )}
              </div>
              
              <Button
                onClick={handleAddWatermark}
                disabled={loading || !selectedFile || !watermarkText.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Add Watermark
                  </>
                )}
              </Button>
            </TabsContent>

            {/* Detect watermark */}
            <TabsContent value="detect" className="space-y-4">
              <div>
                <Label htmlFor="detect-text">Expected Watermark Content</Label>
                <Input
                  id="detect-text"
                  type="text"
                  value={detectText}
                  onChange={(e) => setDetectText(e.target.value)}
                  placeholder="Enter watermark content to detect"
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  🧠 Will use intelligent length inference, no need to manually set length
                </p>
              </div>
              
              <Button
                onClick={handleDetectWatermark}
                disabled={loading || !selectedFile || !detectText.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Detect Watermark
                  </>
                )}
              </Button>
            </TabsContent>

            {/* Scan watermarks */}
            <TabsContent value="scan" className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>Scan all possible watermark content in the image without specifying specific text.</p>
              </div>
              
              <Button
                onClick={handleScanWatermarks}
                disabled={loading || !selectedFile}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4 mr-2" />
                    Scan All Watermarks
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>

          {/* Result display */}
          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                <div className="space-y-2">
                  <p>{result.message}</p>
                  
                  {result.hasWatermark !== undefined && (
                    <div className="flex items-center gap-2">
                      <Badge variant={result.hasWatermark ? "secondary" : "outline"}>
                        {result.hasWatermark ? "✅ Has Watermark" : "❌ No Watermark"}
                      </Badge>
                      {result.confidence && (
                        <Badge variant="outline">
                          Confidence: {(result.confidence * 100).toFixed(1)}%
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {result.decodedContent && (
                    <p className="text-sm">
                      <strong>Decoded Content:</strong> {result.decodedContent}
                    </p>
                  )}
                  
                  {result.foundWatermarksCount !== undefined && (
                    <Badge variant="outline">
                      Found {result.foundWatermarksCount} watermarks
                    </Badge>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Usage tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Usage Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Add Watermark</strong>: System will automatically calculate optimal length and add invisible watermark</li>
              <li>• <strong>Detect Watermark</strong>: Uses intelligent inference, no need to manually set length parameters</li>
              <li>• <strong>Scan Watermarks</strong>: Automatically discover all watermark content in the image</li>
              <li>• <strong>Download File</strong>: Download link will automatically open after adding watermark</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 