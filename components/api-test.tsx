'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WatermarkAPI } from '@/lib/watermarkApi';
import { Check, X, Loader2 } from 'lucide-react';

export const ApiTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    setIsSuccess(null);

    try {
      // Test health check endpoint
      const healthResult = await WatermarkAPI.healthCheck();
      
      if (healthResult.status === 'healthy') {
        setTestResult(`✅ API connection successful! ${healthResult.message}`);
        setIsSuccess(true);
      } else {
        setTestResult('❌ API status abnormal');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('API connection test failed:', error);
      setTestResult(`❌ API connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const testSuggestLength = async () => {
    setIsLoading(true);
    setTestResult(null);
    setIsSuccess(null);

    try {
      const result = await WatermarkAPI.suggestLength('Test watermark text');
      
      if (result.success) {
        setTestResult(`✅ Length suggestion API test successful! Recommended length: ${result.recommended_length} characters`);
        setIsSuccess(true);
      } else {
        setTestResult('❌ Length suggestion API test failed');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Length suggestion API test failed:', error);
      setTestResult(`❌ Length suggestion API failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-sm">🔧</span>
          </div>
          API Connection Test
        </CardTitle>
        <CardDescription>
          Test the connection status between frontend and backend API server
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={testApiConnection}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Health Check Test'
            )}
          </Button>
          
          <Button
            onClick={testSuggestLength}
            disabled={isLoading}
            variant="outline"
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Length Suggestion Test'
            )}
          </Button>
        </div>

        {testResult && (
          <Alert className={`${isSuccess ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            {isSuccess ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <X className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={isSuccess ? 'text-green-700' : 'text-red-700'}>
              {testResult}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>API Address:</strong> http://localhost:8000</p>
          <p><strong>Documentation:</strong> http://localhost:8000/docs</p>
          <p><strong>CORS Support:</strong> ✅ localhost:3001</p>
        </div>
      </CardContent>
    </Card>
  );
}; 