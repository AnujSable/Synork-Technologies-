# 🔐 Credential Checklist

Use this checklist to gather all credentials needed for Firebase and EmailJS setup.

## Firebase Credentials

### Project Setup

- [ ] Firebase Project Name: `___________________________`
- [ ] Firebase Project ID: `___________________________`
- [ ] Firebase Region: `___________________________`

### From Project Settings → Service Accounts

Copy this from the "Web" app configuration:

- [ ] API Key: `___________________________`
- [ ] Auth Domain: `___________________________`
- [ ] Project ID: `___________________________` (should match above)
- [ ] Storage Bucket: `___________________________`
- [ ] Messaging Sender ID: `___________________________`
- [ ] App ID: `___________________________`

**Where to paste**: `src/firebase-config.js`

### Firebase Firestore

- [ ] Firestore Database created: ☐ Yes ☐ No
- [ ] Region: `___________________________`
- [ ] Security Rules updated: ☐ Yes ☐ No

### Firebase Authentication

- [ ] Email/Password enabled: ☐ Yes ☐ No
- [ ] Google Sign-in enabled: ☐ Yes ☐ No (optional)

---

## EmailJS Credentials

### Account & Service

- [ ] EmailJS Account Email: `___________________________`
- [ ] Email Service Connected: ☐ Gmail ☐ Outlook ☐ Other
- [ ] Service ID: `service____________________________`

**Where to paste**: `src/emailjs-service.js` → `EMAILJS_SERVICE_ID`

### API Keys

- [ ] Public Key: `___________________________`

**Where to paste**: `src/emailjs-service.js` → `EMAILJS_PUBLIC_KEY`

### Email Templates

Create these in EmailJS Dashboard → Email Templates:

#### Template 1: Contact Inquiry Notification

- [ ] Template Name: `contact_inquiry`
- [ ] Template ID: `template_____________________________`

**Where to paste**: `src/emailjs-service.js` → `EMAILJS_CONTACT_TEMPLATE_ID`

Template should have variables:

```
{{from_name}} - Sender name
{{from_email}} - Sender email
{{service}} - Service selected
{{message}} - Message content
{{phone}} - Phone (optional)
{{company}} - Company (optional)
{{date}} - Submission date
```

#### Template 2: Confirmation Email

- [ ] Template Name: `contact_confirmation`
- [ ] Template ID: `template_____________________________`

**Where to paste**: `src/emailjs-service.js` → `EMAILJS_CONFIRMATION_TEMPLATE_ID`

Template should have variables:

```
{{to_name}} - User's name
{{to_email}} - User's email
{{subject}} - Inquiry subject
```

### Email Configuration

- [ ] Admin Email Address: `synorktechnologies@gmail.com`
- [ ] Reply-To Email: `___________________________`
- [ ] From Name: `Synork Technologies`

---

## Configuration Files to Update

### File 1: `src/firebase-config.js`

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", // From Firebase
  authDomain: "YOUR_AUTH_DOMAIN_HERE", // From Firebase
  projectId: "YOUR_PROJECT_ID_HERE", // From Firebase
  storageBucket: "YOUR_STORAGE_BUCKET_HERE", // From Firebase
  messagingSenderId: "YOUR_SENDER_ID_HERE", // From Firebase
  appId: "YOUR_APP_ID_HERE", // From Firebase
};
```

✅ Status: `☐ Completed`

### File 2: `src/emailjs-service.js`

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE"; // From EmailJS
const EMAILJS_SERVICE_ID = "service_xxxxx_HERE"; // From EmailJS
const EMAILJS_CONTACT_TEMPLATE_ID = "template_xxxxx"; // Your template
const EMAILJS_CONFIRMATION_TEMPLATE_ID = "template_xxxxx"; // Your template
```

✅ Status: `☐ Completed`

---

## Verification Checklist

After filling in all credentials:

- [ ] Can access Firebase Console
- [ ] Can access EmailJS Dashboard
- [ ] Firebase project has users collection in Firestore
- [ ] EmailJS has email service connected
- [ ] Both template IDs created in EmailJS
- [ ] Credentials pasted into code files

---

## Testing Steps

After configuration:

```bash
npm install
npm run dev
```

### Test 1: Signup

- [ ] Visit http://localhost:5173/signup.html
- [ ] Create test account
- [ ] Check Firebase Authentication tab (user should appear)
- [ ] Check Firestore users collection (profile should appear)
- [ ] Check email for welcome message

### Test 2: Login

- [ ] Visit http://localhost:5173/login.html
- [ ] Login with created account
- [ ] Should redirect to dashboard

### Test 3: Contact Form

- [ ] Visit http://localhost:5173 contact section
- [ ] Fill and submit form
- [ ] Check Firestore contact_inquiries collection (submission should appear)
- [ ] Check email for admin notification and user confirmation

---

## Environment Variables (Optional)

For added security, use `.env.local` instead of hardcoding:

Create `.env.local` in project root:

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_xxxxx
```

Then update `src/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
};
```

---

## Support Links

Need help? Use these links:

- **Firebase Setup**: https://firebase.google.com/docs/web/setup
- **EmailJS Setup**: https://www.emailjs.com/docs/
- **This Guide**: SETUP_FIREBASE_EMAILJS.md
- **Quick Start**: QUICK_START.md

---

## Final Status

- [ ] All Firebase credentials collected
- [ ] All EmailJS credentials collected
- [ ] Both config files updated
- [ ] npm install completed
- [ ] Development server running
- [ ] All tests passing

**Date Completed**: ****\_\_\_****

**Notes/Issues**:

```
___________________________________________________
___________________________________________________
___________________________________________________
```

---

**Save this file and use it as your configuration reference!**
