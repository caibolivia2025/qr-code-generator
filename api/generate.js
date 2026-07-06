// api/generate.js - Vercel Serverless Function
// Deploy to Vercel and access via /api/generate?model=RCBS90&year=2026&month=06&quantity=100

const QRCode = require('qrcode');

function generateSerials(model, year, month, quantity) {
  const serials = [];
  const monthStr = String(month).padStart(2, '0');
  
  for (let i = 1; i <= quantity; i++) {
    const serial = `${model}${year}${monthStr}${String(i).padStart(4, '0')}`;
    serials.push(serial);
  }
  
  return serials;
}

function generateURLs(model, serials) {
  return serials.map(serial => ({
    serial,
    url: `https://wa.me/50761377777?text=SP%20${model}%20serie%20${serial}%20Necesito%20Ayuda`
  }));
}

async function generateQRCodes(urlPairs) {
  const qrCodes = {};
  
  for (const pair of urlPairs) {
    try {
      const dataUrl = await QRCode.toDataURL(pair.url, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      qrCodes[pair.serial] = dataUrl;
    } catch (err) {
      console.error(`Error generating QR for ${pair.serial}:`, err);
    }
  }
  
  return qrCodes;
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  const params = req.method === 'GET' ? req.query : req.body;
  const { model, year, month, quantity } = params;
  
  // Validate inputs
  if (!model || !year || !month || !quantity) {
    res.status(400).json({
      error: 'Missing parameters',
      required: ['model', 'year', 'month', 'quantity']
    });
    return;
  }
  
  try {
    const qty = parseInt(quantity);
    const yr = parseInt(year);
    const mo = parseInt(month);
    
    if (qty < 1 || qty > 1000) {
      throw new Error('Quantity must be between 1-1000');
    }
    
    if (yr < 2020 || yr > 2099) {
      throw new Error('Year must be between 2020-2099');
    }
    
    if (mo < 1 || mo > 12) {
      throw new Error('Month must be between 1-12');
    }
    
    // Generate data
    const serials = generateSerials(model.toUpperCase(), yr, mo, qty);
    const urlPairs = generateURLs(model.toUpperCase(), serials);
    const qrCodes = await generateQRCodes(urlPairs);
    
    res.status(200).json({
      success: true,
      model: model.toUpperCase(),
      year: yr,
      month: mo,
      quantity: qty,
      serial_range: `${serials[0]} → ${serials[serials.length - 1]}`,
      serials: serials,
      urls: urlPairs,
      qrcodes: qrCodes
    });
    
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
