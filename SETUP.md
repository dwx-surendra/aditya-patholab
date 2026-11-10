# Aditya Patho Lab – Website Setup Guide

## Folder Structure

```
aditya-patholab/
├── public/
│   ├── logo.webp          ← Your lab logo (already added)
│   └── doctor-photo.jpg   ← ADD YOUR DOCTOR PHOTO HERE (400×500 px JPG/WebP)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Booking.jsx    ← EmailJS form
│   │   ├── Contact.jsx    ← Contact form
│   │   └── Gallery.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## Step 1 – Install Dependencies

```bash
cd aditya-patholab
npm install
```

---

## Step 2 – Replace Placeholder Text

Search for `[PLACEHOLDER]` patterns across all files and fill in real info:

| Placeholder         | Replace with                            | Files                              |
|---------------------|-----------------------------------------|------------------------------------|
| `[DOCTOR_NAME]`     | Dr. Actual Name (e.g. Dr. Aditya Kumar) | Navbar, Footer, Home, About, Booking |
| `[PHONE_NUMBER]`    | 10-digit mobile, e.g. 9876543210        | Navbar, Footer, Booking, Contact   |
| `[EMAIL_ADDRESS]`   | adityapatholab@gmail.com                | Footer, Contact                    |
| `[YEAR]`            | Founding year of the lab                | About.jsx                          |
| `[X]`               | Years of experience                     | About.jsx                          |
| `+91XXXXXXXXXX`     | Full number, e.g. +919876543210         | App.jsx (WhatsApp), Navbar, Contact |

---

## Step 3 – Add Doctor Photo

Place your doctor photo at:
```
public/doctor-photo.jpg
```
Recommended size: **400 × 500 pixels**, JPG or WebP format.
If you skip this, a styled placeholder is shown automatically.

---

## Step 4 – Replace Gallery Photos

Place real lab photos in the `public/gallery/` folder and update the `src` values
in `src/pages/Gallery.jsx` (look for the `ALL_IMAGES` array).

Example:
```js
{ id: 1, src: '/gallery/lab-reception.jpg', thumb: '/gallery/lab-reception.jpg', ... }
```

---

## Step 5 – Set Up Email Notifications (EmailJS)

This makes the lab receive a Gmail notification for every booking.

### 5a. Create EmailJS account
1. Go to https://www.emailjs.com/ and sign up for free.
2. Under **Email Services**, add **Gmail** and connect your Gmail account.
3. Note your **Service ID** (e.g. `service_abc123`).

### 5b. Create Email Template
1. Under **Email Templates**, create a new template.
2. Set **To Email** to the owner's Gmail address.
3. Set **Subject**: `New Booking – {{patient_name}} – Aditya Patho Lab`
4. Set **Body** (paste this):

```
New Appointment Booking – Aditya Patho Lab

Patient Name : {{patient_name}}
Age          : {{age}}
Gender       : {{gender}}
Phone        : {{phone}}
Email        : {{email}}

Preferred Date      : {{date}}
Preferred Time Slot : {{time_slot}}
Test / Service      : {{test_required}}
Collection Type     : {{collection_type}}

Additional Message  : {{message}}

---
Sent from adityapatholab.com
```

5. Save the template and note your **Template ID**.

### 5c. Get Public Key
Under **Account → API Keys**, copy your **Public Key**.

### 5d. Update the code
Open `src/pages/Booking.jsx` and replace:
```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
```

Do the same in `src/pages/Contact.jsx` for the contact form.

---

## Step 6 – Add Google Maps Embed

1. Go to Google Maps → search **Aditya Patho Lab Chapra**.
2. Click **Share** → **Embed a map** → Copy the `<iframe>` HTML.
3. In `src/pages/Contact.jsx`, find the map placeholder div and replace it with the `<iframe>`.

---

## Step 7 – Update Social Media Links

In `src/components/Footer.jsx`, update the `href` values:
```js
{ href: 'https://www.facebook.com/YourFBPage', ... }
{ href: 'https://www.instagram.com/YourIGPage', ... }
{ href: 'https://www.youtube.com/channel/YourChannel', ... }
```

Also update the WhatsApp link in `src/App.jsx`:
```js
href="https://wa.me/919876543210?text=..."  // use your full number
```

---

## Step 8 – Run Locally

```bash
npm run dev
```
Open http://localhost:5173 in your browser.

---

## Step 9 – Build for Production

```bash
npm run build
```
This creates a `dist/` folder ready to deploy.

---

## Step 10 – Deploy on Netlify (Recommended – Free)

1. Create a free account at https://netlify.com
2. Drag and drop the `dist/` folder onto the Netlify dashboard, **OR**
3. Connect your GitHub repository for automatic deployments.
4. Netlify will give you a free URL like `aditya-patholab.netlify.app`.
5. For a custom domain (e.g. `adityapatholab.com`), add it in Netlify's Domain Settings.

### Alternative: Vercel
```bash
npm install -g vercel
vercel --prod
```

### Alternative: GitHub Pages
Add `base: '/aditya-patholab/'` to `vite.config.js` if using a subfolder.

---

## Color Reference (for future changes)

| Token         | Hex       | Used for               |
|---------------|-----------|------------------------|
| `primary`     | `#1B2B6B` | Navy blue (from logo)  |
| `secondary`   | `#CC0000` | Red (from logo)        |
| `accent`      | `#0088CC` | Bright blue highlights |

---

## Support

If you need help, contact your web developer or visit:
- EmailJS docs: https://www.emailjs.com/docs/
- Tailwind CSS docs: https://tailwindcss.com/docs
- Vite docs: https://vitejs.dev/guide/
