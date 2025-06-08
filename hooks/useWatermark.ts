'use client';

import { useState } from 'react';
import { WatermarkAPI, handleApiCall } from '@/lib/watermarkApi';

interface WatermarkResult {
  hasWatermark?: boolean;
  confidence?: number;
  message: string;
  decodedContent?: string;
  foundWatermarksCount?: number;
}

export const useWatermark = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WatermarkResult | null>(null);

  const addWatermark = async (file: File, text: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await handleApiCall(() => 
        WatermarkAPI.addWatermark(file, text)
      );
      
      if (response.success) {
        // 自动打开下载链接
        const downloadUrl = WatermarkAPI.getDownloadUrl(response.output_filename);
        window.open(downloadUrl, '_blank');
        
        setResult({
          message: `✅ ${response.message}`,
        });
        
        return response;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '操作失败';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const detectWatermark = async (file: File, watermark: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await handleApiCall(() => 
        WatermarkAPI.detectWatermark(file, watermark)
      );
      
      if (response.success) {
        const result: WatermarkResult = {
          hasWatermark: response.has_watermark,
          confidence: response.confidence,
          message: response.has_watermark 
            ? `✅ 检测到水印! 置信度: ${(response.confidence * 100).toFixed(1)}%`
            : `❌ 未检测到指定水印`,
          decodedContent: response.decoded_content
        };
        
        setResult(result);
        return result;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '检测失败';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const scanWatermarks = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await handleApiCall(() => 
        WatermarkAPI.scanWatermarks(file)
      );
      
      if (response.success) {
        const foundCount = response.found_watermarks?.length || 0;
        const result: WatermarkResult = {
          foundWatermarksCount: foundCount,
          message: foundCount > 0 
            ? `🔍 扫描完成，发现 ${foundCount} 个可能的水印`
            : `🔍 扫描完成，未发现水印`
        };
        
        setResult(result);
        return response;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '扫描失败';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSuggestedLength = async (text: string) => {
    try {
      const response = await handleApiCall(() => 
        WatermarkAPI.suggestLength(text)
      );
      
      if (response.success) {
        return {
          recommendedLength: response.recommended_length,
          suggestedLengths: response.suggested_lengths,
          message: response.message
        };
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error('获取长度建议失败:', err);
      return null;
    }
  };

  const clearResults = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    error,
    result,
    addWatermark,
    detectWatermark,
    scanWatermarks,
    getSuggestedLength,
    clearResults,
  };
}; 