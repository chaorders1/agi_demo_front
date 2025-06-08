import { WatermarkTool } from '@/components/watermark-tool';
import { ApiTest } from '@/components/api-test';

export default function WatermarkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Intelligent Watermark Tool
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced algorithm-based invisible watermark technology, supporting intelligent addition, precise detection and comprehensive scanning
          </p>
        </div>
        
        <WatermarkTool />
        
        {/* API Connection Test */}
        <div className="mt-8 mb-8">
          <ApiTest />
        </div>
        
        {/* API Status Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            API Server Running (localhost:8000) | Frontend Running on (localhost:3001)
          </div>
        </div>
      </div>
    </div>
  );
} 