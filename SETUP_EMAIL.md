# Email Setup Guide - EmailJS Configuration

Your portfolio now sends contact form messages directly to **aayushgupta047@gmail.com** with a beautiful delivery confirmation!

## Quick Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email

### Step 2: Create an Email Service
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Connect New Service"**
3. Select **"Gmail"** as the service
4. Click **"Connect with Gmail"**
5. Authorize EmailJS to access your Gmail
6. Copy the **Service ID** (looks like: `service_xxxxx`)

### Step 3: Create an Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Replace the template with this:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

**Important Variables to use:**
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{reply_to}}` - Visitor's email for replies

4. Copy the **Template ID** (looks like: `template_xxxxx`)

### Step 4: Get Your Public Key
1. Go to **Account Settings** → **API Keys**
2. Copy your **Public Key** (looks like: `eE6Ij7JT...`)

### Step 5: Update Your Portfolio
Edit `index.html` and find this line (around line 385):

```javascript
emailJS.init("eE6Ij7JTZqVNplQqC");
```

Replace `eE6Ij7JTZqVNplQqC` with your **Public Key**

### Step 6: Update Form Submission
Edit `script.js` and find the `emailJS.send()` call (around line 135).

Replace these values:
```javascript
const response = await emailJS.send('service_5jh8kq4', 'template_w87qlwp', {
```

With your actual IDs:
- `'service_5jh8kq4'` → Your **Service ID**
- `'template_w87qlwp'` → Your **Template ID**

So it looks like:
```javascript
const response = await emailJS.send('your_service_id', 'your_template_id', {
```

## Features Included

✅ **Message Delivery Confirmation**
- Shows "Message Delivered Successfully!" with animation
- Displays personalized message to visitor
- Confetti celebration animation 🎉

✅ **Beautiful Success Message**
- Animated success card
- Shows email address confirmation
- Includes delivery time estimate

✅ **Form Validation**
- Real-time field validation
- Error messages for each field
- Prevents submission of invalid data

✅ **Contact Section Enhancements**
- Shows your email and location
- Professional, modern design
- Responsive on all devices

✅ **Fallback Storage**
- If email service fails, messages saved locally
- You can retrieve them from browser localStorage
- Code provided to export all saved messages

## Test Your Setup

1. Go to your portfolio
2. Fill in the contact form with test data
3. Click "Send Message"
4. You should see:
   - ✓ Loading animation
   - ✓ Confetti celebration
   - ✓ Success message
   - ✓ Email in your inbox at aayushgupta047@gmail.com

## Troubleshooting

### Email not sending?
- Check that your Service ID and Template ID are correct in script.js
- Check that your Public Key is correct in index.html
- Verify your Gmail is connected to EmailJS
- Check EmailJS dashboard for error logs

### Getting "Invalid Template ID" error?
- Make sure you copied the Template ID correctly
- Template ID should start with `template_`

### Need help?
- EmailJS Documentation: [emailjs.com/docs](https://www.emailjs.com/docs)
- Check browser console (F12) for error messages

## Security Notes

- Your EmailJS Public Key is safe to expose
- It can only send emails through your configured template
- Sensitive API Keys are never stored in client-side code

---

Once setup is complete, try sending a test message! The confetti celebration and success message will appear when delivery is confirmed. 🎊
