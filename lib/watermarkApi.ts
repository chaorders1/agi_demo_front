const API_BASE = 'http://localhost:8000';

interface WatermarkResponse {
  success: boolean;
  message: string;
  [key: string]: unknown;
}

export class WatermarkAPI {
  
  // 添加水印
  static async addWatermark(imageFile: File, text: string, method = 'dwtDct'): Promise<WatermarkResponse> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('text', text);
    formData.append('method', method);

    const response = await fetch(`${API_BASE}/api/watermark/add`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  // 检测水印 (智能推断长度)
  static async detectWatermark(imageFile: File, watermark: string, method = 'dwtDct'): Promise<WatermarkResponse> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('watermark', watermark);
    formData.append('method', method);
    // 不添加length字段，让API智能推断

    const response = await fetch(`${API_BASE}/api/watermark/detect`, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  }

  // 扫描所有水印
  static async scanWatermarks(imageFile: File, method = 'dwtDct', maxLength = 512, verbose = false): Promise<WatermarkResponse> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('method', method);
    formData.append('max_length', maxLength.toString());
    formData.append('verbose', verbose.toString());

    const response = await fetch(`${API_BASE}/api/watermark/scan`, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  }

  // 提取水印
  static async extractWatermark(imageFile: File, length?: number, method = 'dwtDct'): Promise<WatermarkResponse> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('method', method);
    if (length) {
      formData.append('length', length.toString());
    }

    const response = await fetch(`${API_BASE}/api/watermark/extract`, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  }

  // 获取长度建议
  static async suggestLength(text: string): Promise<WatermarkResponse> {
    const formData = new FormData();
    formData.append('text', text);

    const response = await fetch(`${API_BASE}/api/watermark/suggest-length`, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  }

  // 下载处理后的图片
  static getDownloadUrl(filename: string): string {
    return `${API_BASE}/api/download/${filename}`;
  }

  // 健康检查
  static async healthCheck(): Promise<WatermarkResponse> {
    const response = await fetch(`${API_BASE}/api/health`);
    return await response.json();
  }
}

// 错误处理包装器
export const handleApiCall = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API调用失败:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('🔌 API服务器连接失败，请检查服务器是否启动');
    }
    
    if (error instanceof Error && error.message.includes('422')) {
      throw new Error('📋 请求参数错误，请检查表单数据');
    }
    
    throw error;
  }
}; 