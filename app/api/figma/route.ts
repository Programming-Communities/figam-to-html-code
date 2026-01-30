import { NextRequest, NextResponse } from 'next/server';

// Simple API that doesn't require authentication
export async function POST(request: NextRequest) {
  try {
    const { figmaUrl } = await request.json();
    
    // Extract file key from URL
    const fileKey = figmaUrl.match(/figma\.com\/file\/([a-zA-Z0-9]+)/)?.[1] || '';
    
    if (!fileKey) {
      return NextResponse.json(
        { error: 'Invalid Figma URL' },
        { status: 400 }
      );
    }

    // Create HTML with Figma embed
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Figma Design</title>
    <style>
        body { margin: 0; padding: 0; }
        iframe { width: 100%; height: 100vh; border: none; }
    </style>
</head>
<body>
    <iframe src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileKey}" allowfullscreen></iframe>
</body>
</html>`;

    return NextResponse.json({
      success: true,
      html,
      fileKey,
      embedUrl: `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileKey}`
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}