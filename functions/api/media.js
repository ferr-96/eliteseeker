// GET /api/media - List all images in R2 bucket
// Requires valid session token in Authorization header

export async function onRequestGet(context) {
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
    // List all objects in the bucket
    const listed = await env.MEDIA_BUCKET.list();
    
    const images = listed.objects.map(obj => ({
      filename: obj.key,
      url: `https://media.eliteseeker.com.my/${obj.key}`,
      size: obj.size,
      uploaded: obj.uploaded
    }));
    
    // Sort by upload date, newest first
    images.sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded));
    
    return new Response(JSON.stringify({ 
      success: true,
      images,
      count: images.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err) {
    console.error('List error:', err);
    return new Response(JSON.stringify({ error: 'Failed to list images' }), {
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
