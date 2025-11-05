const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  try {
    const data = JSON.parse(event.body);
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
    
    // Handle quote requests
    if (data.type === 'quote' || data.items) {
      const ci = data.customerInfo || {};
      const items = data.items || [];
      const total = data.totalAmount || items.reduce((s, i) => s + (i.total || 0), 0);
      const qid = ci.quoteId || CRBFTN-;
      const itemsHtml = items.map(i => <div style="padding:10px 0;border-bottom:1px solid #eee"><strong></strong><br><span style="color:#666">Size:  | Qty: </span><br><strong style="color:#dc2626">R</strong></div>).join('');
      
      await transporter.sendMail({ from: process.env.EMAIL_USER, to: 'crabfontain@gmail.com', subject:  New Quote # - , html: <div style="font-family:Arial;max-width:600px;margin:0 auto"><div style="background:linear-gradient(135deg,#dc2626,#2563eb);padding:30px;text-align:center"><h1 style="color:white;margin:0">CRBFTN</h1></div><div style="padding:30px"><h3>Customer Info</h3><p><strong>Name:</strong> <br><strong>Email:</strong> <br><strong>Phone:</strong> </p><h3>Items:</h3><div style="background:#dc2626;color:white;padding:15px;text-align:center;font-size:24px;font-weight:bold;margin:20px 0">TOTAL: R</div></div></div> });
      await transporter.sendMail({ from: process.env.EMAIL_USER, to: ci.email, subject:  Your CRBFTN Quote #, html: <div style="font-family:Arial;max-width:600px;margin:0 auto"><div style="background:linear-gradient(135deg,#dc2626,#2563eb);padding:30px;text-align:center"><h1 style="color:white;margin:0">CRBFTN</h1><p style="color:white">Thank You, !</p></div><div style="padding:30px"><h3>Quote Received!</h3><p>We'll get back to you within 24 hours.</p><h3>Your Items:</h3><div style="background:#dc2626;color:white;padding:15px;text-align:center;font-size:20px;font-weight:bold">TOTAL: R</div><p style="text-align:center;margin-top:30px"><strong>Contact:</strong><br> crabfontain@gmail.com<br> +27 68 000 3578</p></div></div> });
      
      return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true, message: 'Quote request sent!', quoteId: qid }) };
    }
    
    // Handle contact form
    const fd = data.formData || data;
    if (!fd.firstName || !fd.lastName || !fd.email || !fd.message) {
      return { statusCode: 400, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Missing required fields' }) };
    }
    
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: 'crabfontain@gmail.com', subject:  Contact -  , html: <div style="font-family:Arial;max-width:600px;margin:0 auto"><div style="background:linear-gradient(135deg,#dc2626,#2563eb);padding:30px;text-align:center"><h1 style="color:white;margin:0">CRBFTN</h1></div><div style="padding:30px"><h3>Contact Info</h3><p><strong>Name:</strong>  <br><strong>Email:</strong> <br><strong>Subject:</strong> </p><div style="background:#dc2626;color:white;padding:20px;border-radius:8px;margin:20px 0"><h3 style="margin-top:0">Message:</h3><p></p></div></div></div> });
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: fd.email, subject: ' Thank you for contacting CRBFTN!', html: <div style="font-family:Arial;max-width:600px;margin:0 auto"><div style="background:linear-gradient(135deg,#dc2626,#2563eb);padding:30px;text-align:center"><h1 style="color:white;margin:0">CRBFTN</h1><p style="color:white">Thank You, !</p></div><div style="padding:30px"><h3>We've Received Your Message!</h3><p>We'll respond within 24 hours.</p><div style="background:#f8f9fa;border-left:5px solid #2563eb;padding:20px;margin:20px 0"><p style="color:#555">""</p></div><p style="text-align:center"><strong>Contact:</strong><br> crabfontain@gmail.com<br> +27 68 000 3578</p></div></div> });
    
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true, message: 'Message sent successfully!' }) };
  } catch (error) {
    return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: error.message }) };
  }
};
