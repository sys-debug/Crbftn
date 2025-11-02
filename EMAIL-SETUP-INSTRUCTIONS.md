# CRBFTN Email Setup Instructions

## 📧 Google App Password Setup

### Step 1: Enable 2-Factor Authentication
1. Go to your **Google Account** (myaccount.google.com)
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable 2FA using your phone

### Step 2: Generate App Password
1. After 2FA is enabled, go back to **Security**
2. Under "Signing in to Google", click **App passwords**
3. Select **Mail** from the dropdown
4. Click **Generate**
5. **Copy the 16-character password** (save it safely!)

## ⚙️ Netlify Environment Variables Setup

### Step 1: Access Netlify Dashboard
1. Go to your **Netlify site dashboard**
2. Click **Site settings**
3. Click **Environment variables** in the left sidebar

### Step 2: Add Email Variables
Add these environment variables:

```
EMAIL_USER = your-gmail-address@gmail.com
EMAIL_PASS = your-16-character-app-password
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_TO = owner-email@gmail.com
```

**Important:** 
- `EMAIL_USER` = The Gmail account you generated the app password for
- `EMAIL_PASS` = The 16-character app password (no spaces)
- `EMAIL_TO` = The email where you want to receive form submissions

### Step 3: Deploy Changes
1. Save the environment variables
2. **Redeploy your site** (Netlify will need to restart to use new variables)

## 📧 How the Branded Email System Works

### Contact Form (`contact.html`)
- When someone fills out the contact form
- Netlify automatically sends a **branded email** using `contact-template.html`
- Email includes:
  - CRBFTN branding and logo
  - Customer details
  - Message content
  - Action buttons to reply directly

### Cart Checkout (`cart.html`)
- When someone requests an invoice
- Netlify sends a **professional invoice** using `invoice-template.html`
- Email includes:
  - Complete order details
  - Branded invoice layout
  - Payment instructions
  - Bank details

### Email Template Features
- **CRBFTN Brand Colors**: Black, white, red, blue
- **Old English Typography**: Classic professional fonts
- **Mobile Responsive**: Looks great on all devices
- **Professional Layout**: Nike-level email design
- **Action Buttons**: Direct reply and call buttons

## 🎨 Email Template Customization

### To Modify Email Templates:
1. Edit files in `/email-templates/` folder:
   - `contact-template.html` - Contact form emails
   - `invoice-template.html` - Order/invoice emails

2. Customize:
   - Brand colors
   - Logo/imagery
   - Contact information
   - Payment details
   - Social media links

### Template Variables Available:
**Contact Form:**
- `{{contactName}}` - Customer name
- `{{contactEmail}}` - Customer email
- `{{contactPhone}}` - Customer phone
- `{{contactSubject}}` - Form subject
- `{{contactMessage}}` - Customer message
- `{{submissionDate}}` - Form submission date

**Invoice Form:**
- `{{customerName}}` - Customer name
- `{{customerEmail}}` - Customer email
- `{{customerPhone}}` - Customer phone
- `{{shippingAddress}}` - Delivery address
- `{{orderItems}}` - Cart items list
- `{{totalAmount}}` - Order total
- `{{invoiceNumber}}` - Auto-generated invoice number

## 🚀 Testing the Email System

### After Setup:
1. Fill out the contact form on your website
2. Add items to cart and request invoice
3. Check your email for branded notifications
4. Verify all template variables are populated correctly

### Troubleshooting:
- If emails don't send: Check environment variables are correct
- If templates look broken: Verify HTML syntax in template files
- If variables show as `{{variable}}`: Check form field names match template variables

## 📞 Support
If you need help with setup, the email templates are designed to be easily customizable. Just modify the HTML files in the `email-templates` folder to match your exact branding needs.

**Your CRBFTN email system is now professional, branded, and ready for business! 🔥**