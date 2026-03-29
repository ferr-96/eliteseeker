# EliteSeeker Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for EliteSeeker with email/password login — **no GitHub required**.

## 📦 What's Already Done

I've created the following schema for your CMS:

| Content Type | What You Can Edit |
|-------------|-------------------|
| **Site Settings** | Company name, tagline, logo, contact info, social links |
| **Home Page** | Hero title, subtitle, CTA button, statistics |
| **About Page** | Story, mission, vision, values, team members |
| **Services** | Individual services with icon, description, features |

## 🚀 Setup Steps (5 minutes)

### Step 1: Create a Sanity Account

1. Go to [sanity.io/login](https://www.sanity.io/login)
2. Click **"Sign up"**
3. Choose **"Continue with Email"** (NOT GitHub!)
4. Enter your email and create a password
5. Verify your email

### Step 2: Create a New Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click **"Create new project"**
3. Enter project name: `EliteSeeker`
4. Choose the **Free plan**
5. Click **"Create project"**

After creation, you'll see:
- **Project ID**: A string like `abc123xyz` — copy this!
- **Dataset**: Should be `production`

### Step 3: Configure the Studio

1. Navigate to the studio folder:
   ```bash
   cd studio/
   ```

2. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your Project ID:
   ```
   SANITY_STUDIO_PROJECT_ID=abc123xyz
   SANITY_STUDIO_DATASET=production
   ```

### Step 4: Install Dependencies & Run

```bash
cd studio/
npm install
npm run dev
```

The studio will open at http://localhost:3333

### Step 5: First Login

When you open the studio for the first time:
1. Click **"Sign in"**
2. Sign in with your Sanity email/password
3. You're in! 🎉

---

## 📝 How to Edit Content

### Adding/Editing Content

1. **Site Settings** (do this first!)
   - Click "Site Settings" in the sidebar
   - Fill in: Company name, tagline, contact info
   - Click "Publish" when done

2. **Services**
   - Click "Service" in the sidebar
   - Click "+ Create new Service"
   - Add: Title, description, icon name
   - Click "Publish"

3. **Home Page**
   - Click "Home Page" in the sidebar
   - Edit hero text, stats, select featured services
   - Click "Publish"

4. **About Page**
   - Click "About Page"
   - Add your company story, values, team
   - Click "Publish"

### Publishing Changes

- **Draft** = Changes saved but not published
- **Published** = Live and visible on the site
- Always click **"Publish"** when you're happy with changes

---

## 🌐 Deploy Your Studio (Optional)

To access your studio from anywhere (not just localhost):

```bash
cd studio/
npm run deploy
```

This deploys to: `https://eliteseeker.sanity.studio`

You can then edit content from any browser!

---

## 🔗 Connecting to the Website

The website can fetch content from Sanity using the Sanity Client. This has been set up in the main project.

### Environment Variables for the Website

Add these to your website's environment:

```
SANITY_PROJECT_ID=abc123xyz
SANITY_DATASET=production
```

### Example: Fetching Services

```javascript
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'abc123xyz',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Fetch all services
const services = await client.fetch(`*[_type == "service"] | order(order asc)`)

// Fetch site settings
const settings = await client.fetch(`*[_type == "siteSettings"][0]`)
```

---

## ❓ Troubleshooting

### "Unauthorized" error
- Make sure you're signed in to Sanity
- Check that your Project ID is correct in `.env`

### "Project not found"
- Double-check the Project ID at [sanity.io/manage](https://www.sanity.io/manage)

### Changes not appearing on site
- Did you click "Publish"?
- Clear your browser cache
- The CDN may take a few seconds to update

---

## 📞 Support

- Sanity Docs: [sanity.io/docs](https://www.sanity.io/docs)
- Sanity Slack Community: [sanity.io/slack](https://slack.sanity.io/)

---

**You're all set!** The CMS is ready for you to manage EliteSeeker content without touching code.
