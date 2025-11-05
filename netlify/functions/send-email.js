const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('📧 Email function started...');
    const data = JSON.parse(event.body);
    console.log('📧 Received data:', JSON.stringify(data));
    
    // Check if this is a QUOTE REQUEST
    if (data.type === 'quote' || data.items || data.customerInfo) {
      console.log('🛒 Processing QUOTE request...');
      const ci = data.customerInfo || {};
      const items = data.items || [];
      const total = data.totalAmount || items.reduce((s, i) => s + (i.total || 0), 0);
      const qid = ci.quoteId || 'CRBFTN-' + Date.now();
      
      if (!ci.email || !ci.name) {
        return { statusCode: 400, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Missing email or name' }) };
      }
      
      const itemsHtml = items.map(i => '<div style="padding:10px 0;border-bottom:1px solid #eee"><strong>' + i.name + '</strong><br><span style="color:#666">Size: ' + i.size + ' | Qty: ' + i.quantity + '</span><br><strong style="color:#dc2626">R' + i.total.toFixed(2) + '</strong></div>').join('');
      
      const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
      
      await transporter.sendMail({ 
        from: process.env.EMAIL_USER, 
        to: 'crabfontain@gmail.com', 
        subject: '🛍️ New Quote #' + qid + ' - ' + ci.name, 
        html: '<div style="font-family:Arial;max-width:600px;margin:0 auto"><div style="background:linear-gradient(135deg,#dc2626,#2563eb);padding:30px;text-align:center"><h1 style="color:white;margin:0">CRBFTN</h1></div><div style="padding:30px"><h3>Customer Info</h3><p><strong>Name:</strong> ' + ci.name + '<br><strong>Email:</strong> ' + ci.email + '<br><strong>Phone:</strong> ' + (ci.phone || 'N/A') + '</p><h3>Items:</h3>' + itemsHtml + '<div style="background:#dc2626;color:white;padding:15px;text-align:center;font-size:24px;font-weight:bold;margin:20px 0">TOTAL: R' + total.toFixed(2) + '</div></div></div>' 
      });
      
      await transporter.sendMail({ 
        from: process.env.EMAIL_USER, 
        to: ci.email, 
        subject: '🛍️ Your CRBFTN Quote #' + qid, 
        html: '<div style="font-family:Arial;max-width:600px;margin:0 auto"><div style="background:linear-gradient(135deg,#dc2626,#2563eb);padding:30px;text-align:center"><h1 style="color:white;margin:0">CRBFTN</h1><p style="color:white">Thank You, ' + ci.name + '!</p></div><div style="padding:30px"><h3>Quote Received!</h3><p>We will get back to you within 24 hours.</p><h3>Your Items:</h3>' + itemsHtml + '<div style="background:#dc2626;color:white;padding:15px;text-align:center;font-size:20px;font-weight:bold">TOTAL: R' + total.toFixed(2) + '</div><p style="text-align:center;margin-top:30px"><strong>Contact:</strong><br>📧 crabfontain@gmail.com<br>📞 +27 68 000 3578</p></div></div>' 
      });
      
      console.log('✅ Quote emails sent');
      return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ success: true, message: 'Quote request sent!', quoteId: qid }) };
    }
    
    // CONTACT FORM handling
    console.log('📧 Processing contact form...');
    const formData = data.formData || data;
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      console.log('❌ Missing required fields');
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Please fill in all required fields: First Name, Last Name, Email, and Message' })
      };
    }

    // Create transporter
    console.log('📧 Creating transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email to business
    console.log('📧 Sending business email...');
    const businessResult = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'crabfontain@gmail.com',
      subject: `� New Contact - ${formData.firstName} ${formData.lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%); padding: 30px; text-align: center; }
            .logo-text { color: white; font-size: 28px; font-weight: bold; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
            .tagline { color: #ffffff; font-size: 14px; margin: 5px 0 0 0; opacity: 0.9; }
            .banner { background: #1f2937; color: #dc2626; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; }
            .content { padding: 30px; }
            .inquiry-box { background: #f8f9fa; border-left: 5px solid #dc2626; padding: 20px; margin: 20px 0; }
            .field-row { margin: 15px 0; }
            .field-label { font-weight: bold; color: #1f2937; display: inline-block; width: 120px; }
            .field-value { color: #555; }
            .message-box { background: #dc2626; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #1f2937; color: #dc2626; padding: 20px; text-align: center; font-size: 12px; }
            .divider { height: 3px; background: linear-gradient(90deg, #dc2626, #2563eb, #dc2626); margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo-text">CRBFTN</h1>
              <p class="tagline">Premium Clothing from Makhado • Style Redefined</p>
            </div>
            
            <div class="banner">
              � NEW CONTACT INQUIRY
            </div>
            
            <div class="content">
              <div class="inquiry-box">
                <h3 style="color: #dc2626; margin-top: 0;">Contact Information</h3>
                <div class="field-row">
                  <span class="field-label">Name:</span>
                  <span class="field-value">${formData.firstName} ${formData.lastName}</span>
                </div>
                <div class="field-row">
                  <span class="field-label">Email:</span>
                  <span class="field-value">${formData.email}</span>
                </div>
                <div class="field-row">
                  <span class="field-label">Subject:</span>
                  <span class="field-value">${formData.subject || 'General Inquiry'}</span>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="message-box">
                <h3 style="margin-top: 0; color: white;">Customer Message:</h3>
                <p style="margin: 0; line-height: 1.6;">${formData.message}</p>
              </div>
              
              <p style="color: #555; margin-top: 30px;">
                <strong>Next Steps:</strong> Respond within 24 hours to maintain excellent customer service standards.
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0;"><strong>CRBFTN Premium Clothing</strong></p>
              <p style="margin: 5px 0;">Makhado, Limpopo Province, South Africa</p>
              <p style="margin: 5px 0;">📧 crabfontain@gmail.com • 📞 +27 68 000 3578</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('✅ Business email sent:', businessResult.messageId);

    // Send confirmation to customer
    console.log('📧 Sending confirmation email...');
    const confirmationResult = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: '� Thank you for contacting CRBFTN!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%); padding: 30px; text-align: center; }
            .logo-text { color: white; font-size: 28px; font-weight: bold; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
            .tagline { color: #ffffff; font-size: 14px; margin: 5px 0 0 0; opacity: 0.9; }
            .welcome-banner { background: #1f2937; color: #dc2626; padding: 20px; text-align: center; }
            .welcome-title { font-size: 24px; margin: 0; font-weight: bold; }
            .content { padding: 30px; }
            .highlight-box { background: linear-gradient(135deg, #dc2626, #2563eb); color: white; padding: 25px; border-radius: 10px; margin: 20px 0; text-align: center; }
            .message-recap { background: #f8f9fa; border-left: 5px solid #2563eb; padding: 20px; margin: 20px 0; }
            .contact-box { background: #1f2937; color: #dc2626; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%); color: white; padding: 20px; text-align: center; font-size: 12px; }
            .divider { height: 3px; background: linear-gradient(90deg, #dc2626, #2563eb, #dc2626); margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo-text">CRBFTN</h1>
              <p class="tagline">Premium Clothing from Makhado • Style Redefined</p>
            </div>
            
            <div class="welcome-banner">
              <h2 class="welcome-title">Thank You, ${formData.firstName}!</h2>
            </div>
            
            <div class="content">
              <div class="highlight-box">
                <h3 style="margin-top: 0;">We've Received Your Message!</h3>
                <p style="margin: 0; font-size: 16px;">Thank you for reaching out to CRBFTN. We'll respond to your inquiry within 24 hours.</p>
              </div>
              
              <div class="message-recap">
                <h3 style="color: #2563eb; margin-top: 0;">Your Message to Us:</h3>
                <p style="margin: 0; line-height: 1.6; color: #555;">"${formData.message}"</p>
              </div>
              
              <div class="divider"></div>
              
              <div class="contact-box">
                <h3 style="margin-top: 0; color: #dc2626;">Contact Information</h3>
                <p style="margin: 5px 0; color: white;"><strong>Email:</strong> crabfontain@gmail.com</p>
                <p style="margin: 5px 0; color: white;"><strong>Phone/WhatsApp:</strong> +27 68 000 3578</p>
                <p style="margin: 5px 0; color: white;"><strong>Location:</strong> Makhado, Limpopo Province, South Africa</p>
              </div>
              
              <p style="text-align: center; color: #555; margin-top: 30px;">
                <em>"Style redefined. Quality delivered. Proudly from Makhado."</em>
              </p>
            </div>
            
            <div class="footer">
              <p style="margin: 0; font-weight: bold;">Best regards,</p>
              <p style="margin: 5px 0;">The CRBFTN Team</p>
              <p style="margin: 5px 0; opacity: 0.8;">Premium clothing from the heart of Limpopo</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('✅ Confirmation email sent:', confirmationResult.messageId);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        success: true,
        message: 'Thank you! Your message has been sent successfully. Check your email for confirmation.'
      })
    };

  } catch (error) {
    console.error('❌ Contact form error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        error: 'Failed to send message: ' + error.message 
      })
    };
  }
};