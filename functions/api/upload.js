// POST /api/upload - Upload image to R2 bucket
// Requires valid session token in Authorization header

const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/webp': 'webp'
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Auth check
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const token = authHeader.slice(7);
  if (!validateToken(token)) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate file type
    const mimeType = file.type;
    if (!ALLOWED_TYPES[mimeType]) {
      return new Response(JSON.stringify({ 
        error: 'Invalid file type. Allowed: jpg, png, gif, svg, webp' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate file size
    if (file.size > MAX_SIZE) {
      return new Response(JSON.stringify({ 
        error: 'File too large. Maximum size: 5MB' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate unique filename: timestamp_originalname
    const ext = ALLOWED_TYPES[mimeType];
    const originalName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}_${originalName}.${ext}`;
    
    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await env.MEDIA_BUCKET.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: mimeType
      }
    });
    
    // Return public URL (assuming R2 public access or custom domain)
    // Adjust this URL pattern based on your R2 setup
    const publicUrl = `https://pub-ffa3aaea9bd84ca796cbcc5f75b053f9.r2.dev/${filename}`;
    
    return new Response(JSON.stringify({ 
      success: true,
      filename,
      url: publicUrl,
      size: file.size,
      type: mimeType
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err) {
    console.error('Upload error:', err);
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Simple token validation - matches admin dashboard session format
function validateToken(token) {
  try {
    const data = JSON.parse(atob(token));
    return data.user && data.expires && Date.now() < data.expires;
  } catch {
    return false;
  }
}
