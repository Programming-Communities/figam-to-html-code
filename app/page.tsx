'use client';

import { useState } from 'react';

export default function Home() {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Extract file key from ANY Figma URL (file or design)
  const extractFileKey = (url: string) => {
    // Matches both /file/ and /design/ URLs
    const match = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  };

  // Generate Figma embed URL
  const generateEmbedUrl = (fileKey: string) => {
    return `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileKey}`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const fileKey = extractFileKey(figmaUrl);
    console.log('Extracted file key:', fileKey); // Debug
    
    if (!fileKey) {
      setError('❌ Please enter a valid Figma file URL (should contain figma.com/file/ or figma.com/design/)');
      return;
    }

    // Set iframe URL for preview
    const embedUrl = generateEmbedUrl(fileKey);
    setIframeUrl(embedUrl);
    
    // For HTML export
    setLoading(true);
    
    setTimeout(() => {
      const templateHTML = createHTMLTemplate(fileKey, figmaUrl);
      setHtmlCode(templateHTML);
      setLoading(false);
    }, 1000);
  };

  // Create HTML template
  const createHTMLTemplate = (fileKey: string, originalUrl: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Figma Design Export</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        h1 {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 10px;
            background: linear-gradient(to right, #ff6f61, #ff8a00);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .description {
            font-size: 18px;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .figma-preview {
            padding: 30px;
            background: #f8f9fa;
        }
        
        .iframe-container {
            width: 100%;
            height: 600px;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid #e1e5e9;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .figma-iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .info-section {
            padding: 30px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .info-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .info-card h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .info-card p {
            color: #666;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e1e5e9;
            color: #666;
            font-size: 14px;
        }
        
        @media (max-width: 768px) {
            .header {
                padding: 20px;
            }
            
            h1 {
                font-size: 32px;
            }
            
            .iframe-container {
                height: 400px;
            }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 Figma Design Export</h1>
            <p class="description">Live preview of your Figma design embedded in HTML</p>
        </div>
        
        <div class="figma-preview">
            <div class="iframe-container">
                <iframe 
                    class="figma-iframe" 
                    src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileKey}"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
        
        <div class="info-section">
            <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Design Information</h2>
            
            <div class="info-grid">
                <div class="info-card">
                    <h3>📋 File Details</h3>
                    <p><strong>File ID:</strong> ${fileKey}</p>
                    <p><strong>Export Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Original URL:</strong> <a href="${originalUrl}" target="_blank">View in Figma</a></p>
                </div>
                
                <div class="info-card">
                    <h3>🚀 How to Use</h3>
                    <p>• This HTML file contains a live Figma embed</p>
                    <p>• The design is fully interactive</p>
                    <p>• You can copy this code to any website</p>
                    <p>• No API keys or tokens required</p>
                </div>
                
                <div class="info-card">
                    <h3>💡 Tips</h3>
                    <p>• Adjust iframe height in CSS as needed</p>
                    <p>• Add your own styles and content</p>
                    <p>• Save as .html file and open in browser</p>
                    <p>• Works on all modern browsers</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Generated by Figma to HTML Converter • ${new Date().getFullYear()}</p>
        </div>
    </div>
</body>
</html>`;
  };

  // Copy HTML to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    alert('✅ HTML copied to clipboard!');
  };

  // Download HTML file
  const downloadHTML = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `figma-export-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('✅ HTML file downloaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Figma to HTML Converter
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Paste ANY Figma URL (file or design) and get HTML code instantly
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Figma URL</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Figma File URL (file or design)
                </label>
                <input
                  type="url"
                  value={figmaUrl}
                  onChange={(e) => {
                    setFigmaUrl(e.target.value);
                    setError('');
                  }}
                  placeholder="https://www.figma.com/file/ABC123 or https://www.figma.com/design/ABC123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Supports both formats: <code className="bg-gray-100 px-1 rounded">/file/</code> and <code className="bg-gray-100 px-1 rounded">/design/</code>
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating HTML...
                  </span>
                ) : (
                  'Generate HTML'
                )}
              </button>

              {/* Live Preview */}
              {iframeUrl && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
                  <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                    <iframe
                      src={iframeUrl}
                      className="w-full h-[300px] md:h-[400px]"
                      allowFullScreen
                      title="Figma Design Preview"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    👆 Interactive Figma design preview
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Output */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Generated HTML</h2>
              {htmlCode && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={downloadHTML}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    ⬇️ Download
                  </button>
                </div>
              )}
            </div>

            <div className="bg-gray-900 rounded-xl p-4 h-[600px] overflow-auto">
              {htmlCode ? (
                <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                  {htmlCode}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-lg mb-2">HTML will appear here</p>
                  <p className="text-sm text-center max-w-md">
                    Enter your Figma URL and click "Generate HTML" to get the code
                  </p>
                </div>
              )}
            </div>

            {htmlCode && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 font-medium">✅ Success! HTML generated</p>
                <p className="text-green-600 text-sm mt-1">
                  File contains: Live Figma embed + Responsive design + Interactive preview
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Get Figma URL</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">1</div>
              <h3 className="font-semibold text-center">Open Figma</h3>
              <p className="text-gray-600 text-sm text-center">Login and open your design</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">2</div>
              <h3 className="font-semibold text-center">Check URL</h3>
              <p className="text-gray-600 text-sm text-center">Look at browser address bar</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">3</div>
              <h3 className="font-semibold text-center">Copy URL</h3>
              <p className="text-gray-600 text-sm text-center">Copy entire URL (Ctrl+C)</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto">4</div>
              <h3 className="font-semibold text-center">Paste Here</h3>
              <p className="text-gray-600 text-sm text-center">Paste URL in the form above</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">📝 Example URLs:</h4>
            <div className="space-y-2">
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">https://www.figma.com/file/P8yBPuzO6tuvv9afknRNdj/Design-Name</code>
              <code className="block bg-gray-100 px-3 py-2 rounded text-sm">https://www.figma.com/design/ABC123DEF456/Project-Name</code>
              <p className="text-sm text-gray-600 mt-2">Both formats work automatically!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}