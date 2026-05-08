# 🎯 Quick Start - Firebase + EmailJS Integration

## ⚡ 5-Minute Setup

### 1. Get Firebase Credentials (2 minutes)

1. Visit [firebase.google.com](https://firebase.google.com)
2. Click "Go to console" → Create new project called "Synork"
3. Go to **Authentication** tab → Enable "Email/Password"
4. Go to **Firestore Database** → Create in test mode
5. Go to **Project Settings** → Copy the `firebaseConfig` object
6. Open `src/firebase-config.js` and paste your config

### 2. Get EmailJS Credentials (2 minutes)

1. Visit [emailjs.com](https://www.emailjs.com)
2. Sign up and connect your Gmail account
3. Go to **Email Services** → Copy your Service ID
4. Go to **Email Templates** → Note the Template IDs
5. Go to **Integration** → Copy your Public Key
6. Open `src/emailjs-service.js` and update:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_CONTACT_TEMPLATE_ID`

### 3. Install & Run (1 minute)

```bash
npm install
npm run dev
```

Visit:

- Signup: `http://localhost:5173/signup.html`
- Login: `http://localhost:5173/login.html`
- Contact: `http://localhost:5173` → Contact section

---

## 📊 What's Integrated

| Feature                 | Status | Location                      |
| ----------------------- | ------ | ----------------------------- |
| **User Authentication** | ✅     | login.html, signup.html       |
| **User Profiles**       | ✅     | Firestore (users collection)  |
| **Contact Form**        | ✅     | index.html                    |
| **Email Notifications** | ✅     | Contact form → admin email    |
| **Form Data Storage**   | ✅     | Firestore (contact_inquiries) |
| **Welcome Emails**      | ✅     | After signup                  |
| **Password Reset**      | ⚙️     | Ready to implement            |
| **Admin Dashboard**     | 📋     | Next steps                    |

---

## 🔑 Key Files Modified

```
src/
├── firebase-config.js         [NEW] Firebase setup
├── firebase-auth.js          [NEW] Login/Signup functions
├── firebase-db.js            [NEW] Database operations
├── emailjs-service.js        [NEW] Email sending
├── contact-form.js           [NEW] Form handler
└── main.js                   [UPDATED] Uses Firebase

login.html                     [UPDATED] Firebase auth
signup.html                    [UPDATED] Firebase auth
index.html                     [Ready] Contact form
server.js                      [UPDATED] Backend support
database.js                    [UPDATED] Added columns
```

---

## ✅ Testing Checklist

- [ ] Create account at `signup.html`
- [ ] User appears in Firebase Authentication
- [ ] Login with created account at `login.html`
- [ ] Submit contact form on index.html
- [ ] Receive confirmation email
- [ ] Form data appears in Firestore `contact_inquiries`

---

## 📝 Credentials Location

Your credentials go in:

**`src/firebase-config.js`** (Firebase)

```javascript
const firebaseConfig = {
  apiKey: "YOUR_KEY_HERE",
  // ...
};
```

**`src/emailjs-service.js`** (EmailJS)

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_KEY_HERE";
const EMAILJS_SERVICE_ID = "service_xxx";
// ...
```

---

## 🚀 Next: Deployment

When ready to deploy:

1. Update Firestore security rules (see full guide)
2. Set environment variables on hosting platform
3. Deploy with: `npm run build && firebase deploy`

For detailed setup, see: **SETUP_FIREBASE_EMAILJS.md**

---

## ❓ Issues?

| Problem                    | Solution                                                   |
| -------------------------- | ---------------------------------------------------------- |
| "Firebase not initialized" | Check credentials in `firebase-config.js`                  |
| "Emails not sending"       | Verify Public Key and Template IDs in `emailjs-service.js` |
| "Form not saving"          | Check Firestore rules allow writes in test mode            |
| "Module not found"         | Run `npm install`                                          |

For more help, see the full SETUP guide or check browser console for errors.

---

**You're all set! 🎉 Your Synork authentication and email system is ready.**
