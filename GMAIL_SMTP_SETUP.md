# Gmail SMTP Setup Checklist for Netlify

## ⚠️ CRITICAL: Your Gmail account MUST be properly configured for SMTP access

Follow these steps **exactly** to fix the 500 error:

---

## Step 1: Enable 2-Step Verification

1. Go to: https://myaccount.google.com/security
2. Find "2-Step Verification"
3. If it says "Off", click it and turn it ON
4. Follow the prompts to set up 2FA (usually via phone)

**❌ Without 2FA enabled, you CANNOT create an App Password!**

---

## Step 2: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
   - If you don't see this option, 2-Step Verification isn't enabled yet
2. Click "Select app" → Choose "Mail"
3. Click "Select device" → Choose "Other (Custom name)"
4. Type: "CRBFTN Website Netlify"
5. Click "Generate"
6. **IMPORTANT**: Copy the 16-character password (looks like: "abcd efgh ijkl mnop")
   - Remove spaces: "abcdefghijklmnop"
   - You'll need this for the next step

---

## Step 3: Update Netlify Environment Variables

### Your Netlify Dashboard Setup:

Go to: **Netlify Dashboard → Your Site → Site settings → Environment variables**

Set these EXACTLY as shown:

```
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_USER = crabfontain@gmail.com
EMAIL_PASS = [paste your 16-character app password here, no spaces]
EMAIL_TO = crabfontain@gmail.com
```

### ✅ Verification:
- [ ] All 5 variables are set
- [ ] EMAIL_PASS is the 16-character App Password (NOT your regular Gmail password)
- [ ] No extra spaces in EMAIL_USER or EMAIL_TO
- [ ] EMAIL_PORT is exactly "587" (not 465, not 25)

---

## Step 4: Redeploy Your Site

**CRITICAL**: After updating environment variables, you MUST redeploy!

### Option A: Trigger Deploy in Netlify Dashboard
1. Go to: Deploys tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deploy to complete (usually 1-2 minutes)

### Option B: Push New Commit
```bash
git add .
git commit -m "Update SMTP configuration"
git push
```

**⚠️ Environment variables only take effect AFTER redeploying!**

---

## Step 5: Test Your Setup

1. Open: `diagnostics.html` on your deployed site
2. Run Test 1 to verify function exists
3. Run Test 2 to test minimal contact form
4. Check for success ✅ or specific error messages

---

## Common Issues & Fixes

### Issue: "Invalid login" or "Username and Password not accepted"
**Fix**: 
- You're using your regular Gmail password instead of the App Password
- Go back to Step 2 and create a proper App Password
- Update EMAIL_PASS in Netlify
- Redeploy

### Issue: "Connection timeout" or "ETIMEDOUT"
**Fix**:
- Verify EMAIL_HOST is exactly "smtp.gmail.com"
- Verify EMAIL_PORT is exactly "587"
- Some networks block port 587 - try from different network
- Check Netlify function logs for detailed error

### Issue: "Missing credentials"
**Fix**:
- One or more environment variables are not set
- Double-check spelling (EMAIL_USER not EMAIL_USERNAME)
- Redeploy after setting variables

### Issue: Still getting 500 error
**Fix**:
1. Check Netlify function logs:
   - Netlify Dashboard → Functions → send-email → Logs
   - Look for detailed error messages
2. Verify 2FA is enabled on Gmail
3. Verify App Password was created AFTER enabling 2FA
4. Try creating a new App Password
5. Make sure you redeployed after setting variables

---

## Verification Checklist

Before contacting support, verify:

- [ ] 2-Step Verification is enabled on Gmail account
- [ ] App Password was generated successfully
- [ ] All 5 environment variables are set in Netlify
- [ ] EMAIL_PASS contains the App Password (not regular password)
- [ ] Site was redeployed after setting environment variables
- [ ] diagnostics.html shows specific error message
- [ ] Checked Netlify function logs for details

---

## Need More Help?

### View Netlify Function Logs:
1. Netlify Dashboard → Your Site
2. Click "Functions" in left sidebar
3. Click "send-email"
4. Click "Logs" tab
5. Look for red error messages

### Test SMTP Locally:
If you want to test the SMTP connection locally:
```javascript
// Create a test file: test-smtp.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'crabfontain@gmail.com',
        pass: 'YOUR_APP_PASSWORD_HERE'
    }
});

transporter.verify()
    .then(() => console.log('✅ SMTP connection successful!'))
    .catch(err => console.error('❌ SMTP error:', err));
```

Run: `node test-smtp.js`

---

## Quick Reference

**Gmail SMTP Settings:**
- Host: `smtp.gmail.com`
- Port: `587`
- Security: `STARTTLS`
- Authentication: Required (App Password)

**App Password Generator:**
https://myaccount.google.com/apppasswords

**Netlify Environment Variables:**
Site settings → Environment variables

**Important**: Always redeploy after changing environment variables!
