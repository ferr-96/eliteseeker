/**
 * EliteSeeker Sanity Client
 * 
 * This file provides functions to fetch content from Sanity CMS.
 * 
 * SETUP:
 * 1. Replace YOUR_PROJECT_ID with your actual Sanity project ID
 * 2. Make sure your dataset is set correctly (default: 'production')
 * 
 * USAGE:
 * Include this script, then use the SanityContent object:
 * 
 *   SanityContent.getSettings().then(settings => {
 *     document.querySelector('.company-name').textContent = settings.companyName;
 *   });
 */

const SanityContent = (function() {
  // CONFIGURATION - Replace with your values!
  const PROJECT_ID = 'YOUR_PROJECT_ID';  // Get this from sanity.io/manage
  const DATASET = 'production';
  const API_VERSION = '2024-01-01';
  
  // Sanity CDN URL
  const baseUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`;
  
  // Helper function to make GROQ queries
  async function query(groq) {
    const url = `${baseUrl}?query=${encodeURIComponent(groq)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  }
  
  // Helper to get image URLs from Sanity
  function imageUrl(image, width = 800) {
    if (!image || !image.asset) return null;
    const ref = image.asset._ref;
    const [, id, dimensions, format] = ref.split('-');
    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}?w=${width}`;
  }
  
  return {
    /**
     * Get site settings (company name, contact info, etc.)
     */
    async getSettings() {
      return await query(`*[_type == "siteSettings"][0]`);
    },
    
    /**
     * Get home page content
     */
    async getHomePage() {
      return await query(`*[_type == "homePage"][0]{
        ...,
        featuredServices[]->{title, shortDescription, icon, slug}
      }`);
    },
    
    /**
     * Get about page content
     */
    async getAboutPage() {
      return await query(`*[_type == "aboutPage"][0]`);
    },
    
    /**
     * Get all services, ordered by display order
     */
    async getServices() {
      return await query(`*[_type == "service"] | order(order asc)`);
    },
    
    /**
     * Get a single service by slug
     */
    async getServiceBySlug(slug) {
      return await query(`*[_type == "service" && slug.current == "${slug}"][0]`);
    },
    
    /**
     * Convert Sanity image reference to URL
     */
    imageUrl: imageUrl,
    
    /**
     * Raw query function for custom GROQ queries
     */
    query: query
  };
})();

// Make available globally
if (typeof window !== 'undefined') {
  window.SanityContent = SanityContent;
}
