# NETLIFY ENVIRONMENT SETUP GUIDE

## CRITICAL: Set These Environment Variables in Netlify Dashboard

1. Go to your Netlify site dashboard
2. Navigate to: **Site settings > Environment variables**
3. Add these EXACT variables:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=crabfontain@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=crabfontain@gmail.com
```

## How to Get Gmail App Password:

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings
3. Security > 2-Step Verification > App passwords
4. Generate an app password for "Mail"
5. Use that 16-character password as EMAIL_PASS

## Alternative: Use Your Current Email Service

If you have hosting email, use these settings instead:

```
EMAIL_HOST=your_mail_server
EMAIL_PORT=587 (or 465 for SSL)
EMAIL_USER=your_email@yourdomain.com
EMAIL_PASS=your_email_password
EMAIL_TO=email.crabfontain@gmail.com
```

## Deploy Instructions:

1. Commit all changes to GitHub
2. Push to your repository
3. Netlify will auto-deploy
4. Test both contact form and quote system

## Fallback System:

If Netlify functions still fail, the site will:
1. Show error with direct email contact
2. Allow users to email you directly
3. Continue working for basic browsing/cart

## NO NEGOTIATIONS - THIS WILL WORK! 💪