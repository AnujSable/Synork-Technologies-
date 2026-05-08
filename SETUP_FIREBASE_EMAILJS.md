# 🚀 Firebase + EmailJS Setup Guide

This guide walks you through setting up **Firebase Authentication**, **Firestore Database**, and **EmailJS** for your Synork application.

---

## 📋 Table of Contents

1. [Firebase Setup](#firebase-setup)
2. [EmailJS Setup](#emailjs-setup)
3. [Configuration](#configuration)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter project name: `Synork` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click **"Create project"** and wait for setup to complete

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get started"**
3. Enable **Email/Password** provider:
   - Click **"Email/Password"**
   - Toggle **"Enable"**
   - Click **"Save"**

### Step 3: Create Firestore Database

1. Go to **Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select region closest to you
5. Click **"Create"**

> **Important**: Update security rules before deploying to production. See [Firestore Security Rules](#firestore-security-rules) below.

### Step 4: Get Your Firebase Config

1. Go to **Project Settings** (gear icon in top-left)
2. Go to **Your apps** section
3. If no app exists, click **"Web"** icon to create one
4. Register app with name `Synork Web`
5. Copy the config object that looks like:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### Step 5: Update Firebase Configuration

1. Open `src/firebase-config.js`
2. Replace the placeholder config with your actual credentials
3. Save the file

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxx...",
  authDomain: "synork-xxxxx.firebaseapp.com",
  projectId: "synork-xxxxx",
  storageBucket: "synork-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};
```

### Firestore Security Rules

Update your Firestore security rules for production use:

1. Go to **Firestore Database** → **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Anyone authenticated can create contact inquiries
    match /contact_inquiries/{document=**} {
      allow create: if request.auth != null;
      // Only admins can read/update (implement admin checking)
      allow read, update: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

---

## 📧 EmailJS Setup

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com)
2. Click **"Sign up free"**
3. Complete signup with your email
4. Verify your email address

### Step 2: Connect Email Service

1. Go to **Email Services** (left sidebar)
2. Click **"Add Service"**
3. Choose your email provider:
   - **Gmail** (recommended) - easiest for free tier
   - Outlook, Yahoo, Custom SMTP
4. Follow the prompts to authorize

#### For Gmail:

1. You'll be prompted to authorize EmailJS to send from your Gmail account
2. Follow the authorization steps
3. Once authorized, your service is created
4. Copy the **Service ID** (looks like `service_xxxxxxx`)

### Step 3: Create Email Templates

#### Template 1: Admin Notification

1. Go to **Email Templates** (left sidebar)
2. Click **"Create New Template"**
3. Set **Template Name**: `contact_inquiry`
4. Configure as follows:

**Email Subject:**

```
New Contact Inquiry from {{from_name}} - {{service}}
```

**Email Content:**

```
Hello,

You have received a new contact inquiry.

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

Service: {{service}}

Message:
{{message}}

Date: {{date}}

---
This email was sent from your Synork website contact form.
```

5. Click **"Save"**
6. Copy the **Template ID** (looks like `template_xxxxxxx`)

#### Template 2: Confirmation Email

1. Create another template with **Template Name**: `contact_confirmation`

**Email Subject:**

```
Thank you for contacting Synork - {{subject}}
```

**Email Content:**

```
Hello {{to_name}},

Thank you for reaching out to Synork! We've received your inquiry about {{subject}}.

Our team will review your request and get back to you within 24 hours.

Best regards,
The Synork Team

---
Contact us: synorktechnologies@gmail.com
```

5. Save and copy the Template ID

### Step 4: Get EmailJS Public Key

1. Go to **Integration** (left sidebar)
2. Copy your **Public Key** (looks like `xxx_xxxxxxxxxxxxxxxxx`)

### Step 5: Update EmailJS Configuration

1. Open `src/emailjs-service.js`
2. Update these constants:

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // From Integration tab
const EMAILJS_SERVICE_ID = "service_xxxxxxx"; // From Email Services
const EMAILJS_CONTACT_TEMPLATE_ID = "template_xxxxxxx"; // contact_inquiry template
const EMAILJS_CONFIRMATION_TEMPLATE_ID = "template_xxxxxxx"; // contact_confirmation template
```

---

## ⚙️ Configuration

### Install Dependencies

```bash
npm install
```

This installs:

- `firebase` - Firebase SDK for frontend
- `@emailjs/browser` - EmailJS for email sending
- All other required packages

### Project Structure

```
synork_edited/
├── src/
│   ├── firebase-config.js       ← Firebase initialization
│   ├── firebase-auth.js         ← Authentication functions
│   ├── firebase-db.js           ← Firestore database functions
│   ├── emailjs-service.js       ← Email service functions
│   ├── contact-form.js          ← Contact form handler
│   ├── main.js                  ← Main application entry
│   └── style.css
├── login.html                   ← Firebase login integration
├── signup.html                  ← Firebase signup integration
├── index.html                   ← Contact form with EmailJS
├── server.js                    ← Backend API (fallback)
└── database.js                  ← SQLite backup database
```

---

## 🧪 Testing

### Test Login/Signup

1. Start your dev server:

```bash
npm run dev
```

2. Navigate to `http://localhost:5173/signup.html`

3. Create a test account:
   - First Name: `Test`
   - Last Name: `User`
   - Email: `test@example.com`
   - Password: `TestPass123!`

4. Check Firebase Console:
   - Go to **Authentication** tab
   - Your user should appear in the list

5. Test Login at `http://localhost:5173/login.html`

### Test Contact Form

1. Navigate to contact form section on index.html
2. Fill out the form:
   - Name: `Test User`
   - Email: Your email
   - Service: Any option
   - Details: Test message

3. Submit and verify:
   - You should receive an email confirmation
   - Check Firebase Firestore → `contact_inquiries` collection
   - Your contact should appear there

### Test Email Notifications

1. Submit contact form
2. Check your email for:
   - **Admin email** (synorktechnologies@gmail.com) with inquiry details
   - **User email** with confirmation message

---

## 🚀 Deployment

### Pre-Deployment Checklist

- [ ] Firebase config has valid credentials
- [ ] EmailJS credentials are configured
- [ ] Firestore security rules are updated
- [ ] Firebase email verification is optional (in Authentication settings)
- [ ] Custom domain configured in Firebase (if needed)

### Deploy to Firebase Hosting (Recommended)

1. **Install Firebase CLI:**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**

   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting:**

   ```bash
   firebase init hosting
   ```

   - Select your Firebase project
   - Public directory: `dist`
   - Configure as single-page app: `Y`
   - Overwrite index.html: `N`

4. **Build and Deploy:**

   ```bash
   npm run build
   firebase deploy
   ```

5. Your app will be live at `https://your-project.firebaseapp.com`

---

## 🔐 Security Best Practices

1. **Never commit credentials** - Add to `.gitignore`:

   ```
   .env.local
   .env*.local
   firebase-config.js
   ```

2. **Use environment variables** in production:

   ```javascript
   // Instead of hardcoding
   const firebaseConfig = {
     apiKey: process.env.VITE_FIREBASE_API_KEY,
     authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
     // ...
   };
   ```

3. **Update Firestore rules** before going live

4. **Enable CORS properly** - Only allow your domain

5. **Rate limit** contact form submissions on backend

---

## 🆘 Troubleshooting

### "Firebase is not initialized"

- Check `firebase-config.js` has valid credentials
- Ensure config is imported in all files that use it

### "EmailJS not sending emails"

- Verify **Public Key** is correct in `emailjs-service.js`
- Check **Service ID** and **Template IDs**
- Verify email service is connected in EmailJS dashboard
- Check EmailJS quota (free tier has limits)

### "Auth/invalid-api-key"

- Copy API key from Firebase project settings
- Make sure you copied the full key with no extra spaces

### "Contact form not saving to Firestore"

- Check Firestore rules allow writes
- Verify Firebase is properly initialized
- Check browser console for errors

### "Emails not being delivered"

- Check spam/junk folder
- Verify email service is authorized in EmailJS
- Check template variable names match (they're case-sensitive)
- Test with EmailJS dashboard test feature

### "Module not found errors"

- Run `npm install` to install dependencies
- Clear node_modules and reinstall if needed
- Verify import paths are correct (case-sensitive on Linux)

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Firebase Web SDK](https://firebase.google.com/docs/web/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)

---

## 💡 Next Steps

1. ✅ Configure Firebase and EmailJS (this guide)
2. Test all features in development
3. Update Firestore security rules
4. Deploy to Firebase Hosting
5. Monitor emails and form submissions
6. Set up admin dashboard for inquiry management

---

**Questions?** Contact: synorktechnologies@gmail.com
