// DELETE /api/media/[filename] - Delete an image from R2 bucket
// Requires valid session token in Authorization header

export async function onRequestDelete(context) {
  const { request, env, params } = context;
  
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
  
  const filename = params.filename;
  
  if (!filename) {
    return new Response(JSON.stringify({ error: 'Filename required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Check if file exists
    const existing = await env.MEDIA_BUCKET.head(filename);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Delete from R2
    await env.MEDIA_BUCKET.delete(filename);
    
    return new Response(JSON.stringify({ 
      success: true,
      message: `Deleted ${filename}`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err) {
    console.error('Delete error:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Simple token validation
function validateToken(token) {
  try {
    const data = JSON.parse(atob(token));
    return data.user && data.expires && Date.now() < data.expires;
  } catch {
    return false;
  }
}
