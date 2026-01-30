// app/api/figma/export-real/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { fileKey, nodeIds, figmaToken } = await request.json();

    // Step 1: Get file data
    const fileResponse = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}`,
      {
        headers: { 'Authorization': `Bearer ${figmaToken}` }
      }
    );

    const figmaData = fileResponse.data;
    
    // Step 2: Get images
    const imageResponse = await axios.post(
      `https://api.figma.com/v1/images/${fileKey}`,
      {
        ids: nodeIds?.join(',') || getTopLevelIds(figmaData),
        format: 'png',
        scale: 2
      },
      {
        headers: { 'Authorization': `Bearer ${figmaToken}` }
      }
    );

    // Step 3: Generate HTML with real elements
    const html = generateRealHTML(figmaData, imageResponse.data.images);

    return NextResponse.json({
      success: true,
      html,
      images: imageResponse.data.images
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    );
  }
}

function generateRealHTML(figmaData: any, images: any) {
  const { document } = figmaData;
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${figmaData.name}</title>
    <style>
        ${generateRealCSS(document)}
    </style>
</head>
<body>
    ${generateRealElements(document, images)}
    <script>
        ${generateJS()}
    </script>
</body>
</html>`;
  
  return html;
}