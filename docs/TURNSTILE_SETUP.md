# Cloudflare Turnstile Setup Guide

## 🔒 Cloudflare Turnstile Bot Protection

KiviTools uses Cloudflare Turnstile to protect all 29 AI tools from bot abuse. Turnstile is a free, privacy-friendly CAPTCHA alternative that's invisible to users.

## 📝 Setup Instructions

### 1. Get Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account (or create one - it's free)
3. Navigate to **Turnstile** in the left sidebar
4. Click **"Add Site"**
5. Configure your site:
   - **Site name**: KiviTools
   - **Domain**: Your domain (e.g., `kivitools.com`) or `localhost` for development
   - **Widget Mode**: **Managed** (recommended)
6. Click **"Create"**
7. Copy your keys:
   - **Site Key** (starts with `0x...`)
   - **Secret Key**

### 2. Add Keys to Environment Variables

Edit `.env.local` and replace the placeholder values:

```bash
# Cloudflare Turnstile (Bot Protection)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA... # Your actual site key
TURNSTILE_SECRET_KEY=0x4AAAAAAA...           # Your actual secret key
```

### 3. Restart Development Server

```bash
npm run dev
```

## 🎯 How It Works

### Client-Side (Tool Pages)

1. User fills out form on any tool page
2. Turnstile widget validates in background (invisible)
3. On form submit, Turnstile token is sent with request

### Server-Side (API Routes)

1. API receives request with Turnstile token
2. Token is verified with Cloudflare's API
3. If valid → Process AI generation
4. If invalid → Return 403 error

## 🛡️ Protected Tools

All 29 tools are protected:

### TikTok (9 tools)

- Script Writer
- Video Ideas Generator
- Hook Generator
- Hashtag Generator
- Username Generator
- Shop Name Generator
- Engagement Calculator
- Money Calculator
- Coins Calculator

### Instagram (3 tools)

- Bio Generator
- Caption Generator
- Reel Script Generator

### Twitter (3 tools)

- Bio Generator
- Tweet Generator
- Thread Maker

### Snapchat (3 tools)

- Caption Generator
- Story Ideas Generator
- Lens Ideas Generator

### YouTube (3 tools)

- Title Generator
- Description Generator
- Script Generator

### Reddit (3 tools)

- Post Generator
- Comment Generator
- AMA Questions Generator

### Discord (3 tools)

- Announcement Generator
- Event Description Generator
- Welcome Message Generator

### Twitch (3 tools)

- Stream Title Generator
- Panel Description Generator
- Chat Command Generator

## 🔧 Development vs Production

### Development (localhost)

- Use domain: `localhost` in Turnstile dashboard
- Widget works on `http://localhost:3000`

### Production

- Update domain in Turnstile dashboard to your actual domain
- Update `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in production environment variables

## 🚨 Troubleshooting

### Widget not showing?

- Check `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set correctly
- Verify domain matches Turnstile dashboard settings
- Check browser console for errors

### Verification failing?

- Confirm `TURNSTILE_SECRET_KEY` is set correctly
- Check API route logs for detailed error messages
- Verify token is being sent from client

### "Invalid domain" error?

- Add your domain/localhost to Turnstile dashboard
- Wait a few minutes for DNS propagation

## 📊 Monitoring

Check Turnstile dashboard for:

- Request volume
- Block rate
- Pass/fail statistics
- Bot detection insights

## 🆓 Free Tier Limits

Cloudflare Turnstile is **100% free** with:

- ✅ Unlimited requests
- ✅ Unlimited domains
- ✅ No time limits
- ✅ Full features

## 🔗 Resources

- [Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
- [React Turnstile Package](https://github.com/marsidev/react-turnstile)
