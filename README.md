# EliteSeeker Website

Professional recruitment agency website for EliteSeeker (Malaysia).

## Features
- Modern, responsive design
- 4 pages: Home, About, Services, Contact
- Admin dashboard (Decap CMS) at `/admin`
- Free hosting on Cloudflare Pages

## Quick Deploy to Cloudflare Pages

### Step 1: Push to GitHub
1. Create a new repository on GitHub (e.g., `eliteseeker-website`)
2. Push this code:
```bash
cd eliteseeker
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eliteseeker-website.git
git push -u origin main
```

### Step 2: Deploy on Cloudflare Pages
1. Go to https://dash.cloudflare.com/
2. Click **Pages** → **Create a project** → **Connect to Git**
3. Select your GitHub repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
5. Click **Save and Deploy**

Your site will be live at: `https://eliteseeker-website.pages.dev`

### Step 3: Custom Domain (Optional)
1. In Cloudflare Pages dashboard → **Custom domains**
2. Add your domain (e.g., `eliteseeker.com.my`)
3. Follow DNS setup instructions

## Admin Dashboard Setup

The CMS uses Decap CMS with Git Gateway. To enable editing:

### Option A: Use with Netlify Identity (Easiest)
1. Deploy to Netlify instead of Cloudflare
2. Enable **Identity** in Netlify dashboard
3. Enable **Git Gateway** under Identity settings
4. Access `/admin` and register

### Option B: Use with Cloudflare (Manual Git)
For Cloudflare Pages, the admin panel shows content structure but needs backend setup.
Simple alternative: Edit the JSON files in `/content/` directly and push to GitHub.

## File Structure
```
eliteseeker/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # JavaScript
├── images/
│   └── logo.svg        # Company logo
├── admin/
│   ├── index.html      # CMS entry
│   └── config.yml      # CMS config
└── content/
    ├── home.json       # Home page content
    ├── about.json      # About page content
    ├── contact.json    # Contact info
    └── settings.json   # Site settings
```

## Customization

### Change Logo
Replace `images/logo.svg` with your own logo file.

### Edit Content
- **Quick way:** Edit the JSON files in `/content/`
- **CMS way:** Set up admin panel (see above)

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary: #1E3A5F;    /* Dark blue */
  --secondary: #2E86AB;  /* Light blue */
  --accent: #F18F01;     /* Orange */
}
```

## Contact Form
The contact form currently shows a success message. To receive submissions:
- Use Formspree (free): Add `action="https://formspree.io/f/YOUR_ID"` to form
- Use Cloudflare Workers
- Use any form backend service

---
Built for EliteSeeker Malaysia
