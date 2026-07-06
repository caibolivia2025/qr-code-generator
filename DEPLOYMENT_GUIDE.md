# 🚀 QR Code Generator - Vercel Deployment Guide

## Project Structure

```
qr-code-generator/
├── api/
│   └── generate.js          (Serverless API endpoint)
├── index.html               (Frontend)
├── package.json             (Dependencies)
├── vercel.json              (Vercel config)
└── README.md               (This file)
```

---

## 📋 Deployment Steps (5 minutes)

### **Step 1: Create GitHub Repository**

1. Go to https://github.com/new
2. Create repo named `qr-code-generator`
3. Clone it locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/qr-code-generator.git
   cd qr-code-generator
   ```

### **Step 2: Add Project Files**

Copy these files into your repo:
- `api/generate.js` (create `api/` folder first)
- `index.html`
- `package.json`
- `vercel.json`

```bash
mkdir api
# Copy files here
```

### **Step 3: Push to GitHub**

```bash
git add .
git commit -m "Initial QR code generator setup"
git push origin main
```

### **Step 4: Deploy to Vercel**

**Option A: Via Vercel Web Dashboard**

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Click "Deploy"
5. Done! ✓

**Option B: Via Vercel CLI**

```bash
npm i -g vercel
vercel --prod
```

---

## 🎯 What You Get

After deployment, you'll have:

```
https://your-project-name.vercel.app
```

### **Features:**

- ✅ Web UI for generating QR codes
- ✅ No download issues (cloud-based)
- ✅ Generates 3 outputs:
  1. Serial numbers CSV
  2. Serial numbers + URLs CSV
  3. QR code images (JSON with base64)
- ✅ Works on any device
- ✅ Shareable URL

---

## 💻 Usage

1. Open `https://your-project-name.vercel.app`
2. Enter:
   - **Model Name:** RCBS90, WBS6540, etc.
   - **Year:** 2026
   - **Month:** 06
   - **Quantity:** 100-1000
3. Click "Generate QR Codes"
4. Download CSVs and QR code data

---

## 🔧 API Endpoint (Direct Use)

The serverless function is accessible at:

```
GET /api/generate?model=RCBS90&year=2026&month=06&quantity=100
```

Returns:
```json
{
  "success": true,
  "model": "RCBS90",
  "year": 2026,
  "month": 6,
  "quantity": 100,
  "serial_range": "RCBS9020260601 → RCBS9020260100",
  "serials": ["RCBS9020260601", "RCBS9020260602", ...],
  "urls": [
    {
      "serial": "RCBS9020260601",
      "url": "https://wa.me/50761377777?text=SP%20RCBS90%20..."
    },
    ...
  ],
  "qrcodes": {
    "RCBS9020260601": "data:image/png;base64,...",
    "RCBS9020260602": "data:image/png;base64,...",
    ...
  }
}
```

---

## 📦 File Descriptions

| File | Purpose |
|------|---------|
| `api/generate.js` | Serverless function - generates serials, URLs, QR codes |
| `index.html` | Web frontend - form + downloads |
| `package.json` | Node dependencies (qrcode library) |
| `vercel.json` | Vercel deployment config |

---

## 🆘 Troubleshooting

**"Module not found: qrcode"**
- Vercel installs dependencies automatically, but you can force it:
  ```bash
  npm install qrcode
  ```

**"404 API endpoint"**
- Make sure `api/` folder structure is correct
- Vercel expects functions in `/api/` directory

**Download not working**
- All three outputs download as separate CSV/JSON files
- QR codes are provided as base64 in JSON format

---

## 🎨 Customization

### Change WhatsApp Phone Number
Edit `api/generate.js`, line with:
```javascript
url: `https://wa.me/50761377777?text=...`
```

Change `50761377777` to your number.

### Change API Quantity Limit
Edit `api/generate.js`:
```javascript
if (qty < 1 || qty > 1000) {  // Change 1000 to your limit
```

---

## 📊 Environment Variables (Optional)

If you want to use environment variables, create `.env.local`:

```
WHATSAPP_PHONE=50761377777
MAX_QUANTITY=1000
```

---

## 🔗 Share Your Deployment

Your URL is now ready to share:
```
https://your-project-name.vercel.app
```

Everyone can use it to generate QR codes!

---

## 📝 Notes

- Free Vercel tier includes unlimited deployments
- Serverless functions have generous free limits
- Your deployment is automatically HTTPS + CDN cached
- No maintenance required!

---

**Questions?** Check Vercel docs: https://vercel.com/docs
