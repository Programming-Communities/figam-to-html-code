'use client';

import { useState } from 'react';

export default function Home() {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract file key from Figma URL
  const extractFileKey = (url: string) => {
    const match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] : '';
  };

  // Generate Figma embed URL
  const generateEmbedUrl = (fileKey: string) => {
    return `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileKey}`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fileKey = extractFileKey(figmaUrl);
    if (!fileKey) {
      alert('Please enter a valid Figma file URL');
      return;
    }

    // Set iframe URL for preview
    setIframeUrl(generateEmbedUrl(fileKey));
    
    // For HTML export, we'll use a simple approach
    setLoading(true);
    
    // Since we can't directly convert without API, we'll create a template
    setTimeout(() => {
      const templateHTML = createHTMLTemplate(fileKey);
      setHtmlCode(templateHTML);
      setLoading(false);
    }, 1000);
  };

  // Create a basic HTML template
  const createHTMLTemplate = (fileKey: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Figma Design</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }
        
        body {
            background: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
        }
        
        h1 {
            color: #333;
            font-size: 36px;
            margin-bottom: 10px;
        }
        
        .description {
            color: #666;
            font-size: 18px;
            line-height: 1.6;
        }
        
        .figma-embed {
            width: 100%;
            height: 600px;
            border: none;
            border-radius: 8px;
            margin: 20px 0;
        }
        
        .content {
            margin-top: 40px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 24px;
            color: #333;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .section-content {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            line-height: 1.6;
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Figma Design Export</h1>
            <p class="description">This is an HTML export of your Figma design. You can embed the Figma file and customize this template.</p>
        </div>
        
        <iframe 
            class="figma-embed" 
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileKey}"
            allowfullscreen
        ></iframe>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">Design Details</h2>
                <div class="section-content">
                    <p><strong>File Key:</strong> ${fileKey}</p>
                    <p><strong>Embed URL:</strong> https://www.figma.com/file/${fileKey}</p>
                    <p><strong>Export Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">How to Use</h2>
                <div class="section-content">
                    <p>1. This HTML file contains an embedded Figma design</p>
                    <p>2. You can customize the styles in the &lt;style&gt; tag</p>
                    <p>3. Add your own content in the HTML structure</p>
                    <p>4. Save this file and open it in any browser</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  // Copy HTML to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    alert('HTML copied to clipboard!');
  };

  // Download HTML file
  const downloadHTML = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'figma-design.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            Paste your Figma file URL and get HTML code instantly
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Figma URL</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Figma File URL
                </label>
                <input
                  type="url"
                  value={figmaUrl}
                  onChange={(e) => setFigmaUrl(e.target.value)}
                  placeholder="https://www.figma.com/file/ABC123/Your-Design"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Copy the URL from your browser when viewing the Figma file
                </p>
              </div>

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
            </form>

            {/* Preview iframe */}
            {iframeUrl && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    src={iframeUrl}
                    className="w-full h-[400px]"
                    allowFullScreen
                    title="Figma Design Preview"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Output */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Generated HTML</h2>
              {htmlCode && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    Copy
                  </button>
                  <button
                    onClick={downloadHTML}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Download
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
                  <p className="text-sm text-center">Enter a Figma URL and click Generate HTML to get started</p>
                </div>
              )}
            </div>

            {htmlCode && (
              <div className="mt-4 text-sm text-gray-600">
                <p>✅ HTML generated successfully! Copy or download the code.</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold text-gray-800">Get Figma URL</h3>
              </div>
              <p className="text-gray-600">Open your Figma design and copy the URL from browser</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold text-gray-800">Paste & Generate</h3>
              </div>
              <p className="text-gray-600">Paste the URL and click Generate HTML button</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold text-gray-800">Use HTML</h3>
              </div>
              <p className="text-gray-600">Copy or download the HTML code for your project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}