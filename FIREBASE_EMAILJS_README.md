# 🔐 Synork - Firebase Authentication & EmailJS Integration

This document describes the Firebase and EmailJS integration for Synork Technologies website.

## 📌 Overview

The Synork platform now features:

- **🔐 Secure User Authentication** via Firebase (Google-managed, no plaintext passwords)
- **📱 User Profile Management** in Firestore (persistent across sessions)
- **📧 Automated Email Notifications** via EmailJS
- **📋 Contact Form Submissions** saved to Firestore
- **⚡ Serverless Architecture** (no custom backend needed)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Vite)                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ login.html / signup.html / index.html (Contact Form)   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼────────┐         ┌───────▼────────┐
        │   Firebase     │         │    EmailJS     │
        │ ┌────────────┐ │         │  ┌──────────┐  │
        │ │Auth (Users)│ │         │  │SMTP Gate│  │
        │ └────────────┘ │         │  └──────────┘  │
        │ ┌────────────┐ │         │                │
        │ │ Firestore  │ │         │   Gmail (or    │
        │ │ (Database) │ │         │   your email)  │
        │ └────────────┘ │         │                │
        │ ┌────────────┐ │         │                │
        │ │ Analytics  │ │         │                │
        │ └────────────┘ │         │                │
        └────────────────┘         └────────────────┘
```

## 📂 File Structure

### Core Firebase Modules

| File                     | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `src/firebase-config.js` | Firebase initialization with credentials |
| `src/firebase-auth.js`   | Login, signup, password reset functions  |
| `src/firebase-db.js`     | Firestore database operations            |
| `src/emailjs-service.js` | Email sending via EmailJS                |
| `src/contact-form.js`    | Contact form submission handler          |

### Updated HTML Files

| File           | Changes                                 |
| -------------- | --------------------------------------- |
| `login.html`   | Firebase authentication integrated      |
| `signup.html`  | Firebase auth + welcome email on signup |
| `index.html`   | Contact form uses Firestore + EmailJS   |
| `careers.html` | Links to authentication                 |

### Backend Support

| File          | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `server.js`   | Express backend (fallback API, admin endpoints) |
| `database.js` | SQLite backup for contact forms                 |

## 🔑 Credentials Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create project and get `firebaseConfig`
3. Add to `src/firebase-config.js`:

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

### EmailJS Setup

1. Go to [EmailJS](https://www.emailjs.com)
2. Get Public Key, Service ID, Template IDs
3. Add to `src/emailjs-service.js`:

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "service_xxxxxxx";
const EMAILJS_CONTACT_TEMPLATE_ID = "template_xxxxxxx";
const EMAILJS_CONFIRMATION_TEMPLATE_ID = "template_xxxxxxx";
```

**👉 Full setup instructions in [SETUP_FIREBASE_EMAILJS.md](./SETUP_FIREBASE_EMAILJS.md)**

## 🔐 Authentication Flow

### Signup Flow

```
User → signup.html
  ↓
Firebase Auth (createUserWithEmailAndPassword)
  ↓
Create user profile in Firestore
  ↓
Send welcome email via EmailJS
  ↓
Redirect to dashboard
```

### Login Flow

```
User → login.html
  ↓
Firebase Auth (signInWithEmailAndPassword)
  ↓
Fetch user profile from Firestore
  ↓
Store in localStorage for quick access
  ↓
Redirect to dashboard
```

## 📧 Contact Form Flow

```
User → Contact Form (index.html)
  ↓
Validate form input
  ↓
Save to Firestore (contact_inquiries)
  ↓
Send admin email via EmailJS
  ↓
Send confirmation email to user
  ↓
Display success message
```

## 🗄️ Firestore Collections

### `users` Collection

Stores user profile data:

```javascript
{
  uid: "user_id",
  email: "user@example.com",
  fullName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

### `contact_inquiries` Collection

Stores contact form submissions:

```javascript
{
  name: "John Doe",
  email: "john@example.com",
  service: "data-science-ai",
  details: "We need help with ML...",
  phone: "+1-555-0000",
  company: "Acme Corp",
  userId: "user_id or null",
  userEmail: "john@example.com",
  status: "new",
  source: "web_form",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🔐 Security Features

✅ **No plaintext passwords** - Firebase handles encryption  
✅ **Secure sessions** - Firebase JWT tokens  
✅ **Email verification** - Can enable in Firebase  
✅ **Password reset** - Built-in Firebase function  
✅ **Firestore rules** - Row-level security  
✅ **CORS protection** - Only your domain

See [SETUP_FIREBASE_EMAILJS.md](./SETUP_FIREBASE_EMAILJS.md) for security rules.

## 📊 Available API Functions

### Authentication (`firebase-auth.js`)

```javascript
signupUser(email, password, fullName, additionalData);
loginUser(email, password);
logoutUser();
resetPassword(email);
onAuthStateListener(callback);
getCurrentUser();
```

### Database (`firebase-db.js`)

```javascript
saveContactInquiry(contactData);
updateUserProfile(userId, userData);
getUserProfile(userId);
getUserInquiries(userId, limitCount);
updateInquiryStatus(inquiryId, status);
getAllInquiries(limitCount);
```

### Email (`emailjs-service.js`)

```javascript
initializeEmailJS();
sendContactFormEmail(contactData);
sendConfirmationEmail(confirmationData);
sendWelcomeEmail(userData);
sendPasswordResetEmail(resetData);
sendBulkEmails(recipients, emailData);
```

## 🚀 Deployment

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

### Production

```bash
npm run build
firebase deploy
```

**Important**: Update Firestore security rules before deploying.

## 📈 Monitoring & Analytics

### Firebase Console

- **Authentication**: View all users, manage access
- **Firestore**: View stored data, query documents
- **Analytics**: Track user behavior (if enabled)

### EmailJS Dashboard

- **Sent Emails**: Track delivery status
- **Failed Emails**: Debug sending issues
- **Usage**: Monitor quota and limits

## 🐛 Common Issues

### "Firebase not initialized"

Check `firebase-config.js` has correct credentials.

### "Emails not sending"

Verify EmailJS Public Key and Template IDs in `emailjs-service.js`.

### "Firestore permission denied"

Check rules in Firestore → Security Rules. Should allow reads/writes in test mode.

### "Module not found"

Run `npm install` to install dependencies.

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

## 📖 Documentation Files

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[SETUP_FIREBASE_EMAILJS.md](./SETUP_FIREBASE_EMAILJS.md)** - Detailed configuration
- **[.env.example](./.env.example)** - Environment variables template

## 🎯 Next Steps

1. ✅ Follow QUICK_START.md for setup
2. Test signup/login/contact form
3. Update Firestore security rules
4. Deploy to Firebase Hosting
5. Set up admin dashboard for inquiry management

## 💬 Support

For issues or questions:

- Check browser console for errors
- Review Firebase and EmailJS dashboards
- See troubleshooting sections in setup guides
- Contact: synorktechnologies@gmail.com

---

**Last Updated**: January 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
