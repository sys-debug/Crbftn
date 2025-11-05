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
      
      const itemsCount = items.reduce((sum, i) => sum + i.quantity, 0);
      const minQuote = (total * 1.4).toFixed(2);
      const maxQuote = (total * 1.6).toFixed(2);
      const timestamp = new Date().toLocaleString();
      
      const cartItemsHtml = items.map(i => '<div class="cart-item"><div class="item-details"><div class="item-name">' + i.name + '</div><div class="item-specs">Size: ' + i.size + ' | Qty: ' + i.quantity + '</div></div><div class="item-price">R' + i.total.toFixed(2) + '</div></div>').join('');
      
      await transporter.sendMail({ 
        from: process.env.EMAIL_USER, 
        to: 'crabfontain@gmail.com', 
        subject: '🛍️ New Quote Request #' + qid + ' - ' + ci.name, 
        html: '<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f9fafb;color:#1f2937}.container{max-width:700px;margin:0 auto;background-color:#fff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#dc2626,#1d4ed8);color:#fff;padding:40px 30px;text-align:center}.header h1{margin:0;font-size:32px;font-weight:700;letter-spacing:2px}.header p{margin:10px 0 0;font-size:16px;opacity:.9}.content{padding:40px 30px}.alert{background:linear-gradient(135deg,#fee2e2,#dbeafe);border-left:4px solid #dc2626;padding:20px;margin-bottom:30px;border-radius:8px}.alert h2{margin:0 0 10px;color:#dc2626;font-size:20px}.cart-summary{background:#f3f4f6;border-radius:12px;padding:25px;margin:25px 0}.cart-summary h3{margin:0 0 20px;color:#1f2937;font-size:20px;text-align:center}.cart-item{display:flex;justify-content:space-between;align-items:center;padding:15px;background:#fff;border-radius:8px;margin-bottom:10px;border:1px solid #e5e7eb}.item-details{flex:1}.item-name{font-weight:600;color:#1f2937;font-size:16px}.item-specs{color:#6b7280;font-size:14px;margin-top:5px}.item-price{font-weight:600;color:#dc2626;font-size:16px}.total-section{background:linear-gradient(135deg,#1f2937,#374151);color:#fff;border-radius:12px;padding:25px;margin:25px 0;text-align:center}.total-section h3{margin:0 0 15px;font-size:18px}.total-amount{font-size:32px;font-weight:700;color:#dc2626;margin:10px 0}.customer-info{background:#f9fafb;border-radius:12px;padding:25px;margin:25px 0;border-left:4px solid #1d4ed8}.customer-info h3{margin:0 0 20px;color:#1d4ed8;font-size:18px}.info-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb}.info-label{font-weight:600;color:#374151}.info-value{color:#1f2937;font-weight:500}.priority-notice{background:linear-gradient(135deg,#fee2e2,#fef2f2);border:2px solid #dc2626;padding:20px;border-radius:8px;margin:20px 0;text-align:center}.priority-notice strong{color:#dc2626;font-size:18px}.profit-margin{background:#d1fae5;border:2px solid #10b981;padding:15px;border-radius:8px;margin:15px 0}.profit-margin h4{margin:0 0 10px;color:#047857}.profit-calculation{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:14px}.footer{background:#1f2937;color:#fff;padding:30px;text-align:center}.footer h3{margin:0 0 15px;color:#dc2626}.footer p{margin:5px 0;opacity:.8}.timestamp{background:#e5e7eb;padding:10px 15px;border-radius:6px;font-size:14px;color:#6b7280;text-align:center;margin:20px 0}</style></head><body><div class="container"><div class="header"><h1>CRBFTN</h1><p>New Quote Request Received</p></div><div class="content"><div class="alert"><h2>🛒 New Quote Request</h2><p>A customer has requested a quote. Review the order details below.</p></div><div class="cart-summary"><h3>🛍️ Requested Items</h3>' + cartItemsHtml + '</div><div class="total-section"><h3>💰 Order Value</h3><div class="total-amount">R' + total.toFixed(2) + '</div><p>Estimated retail value of requested items</p></div><div class="profit-margin"><h4>📊 Profit Analysis</h4><div class="profit-calculation"><div><strong>Retail Value:</strong> R' + total.toFixed(2) + '</div><div><strong>Suggested Margin:</strong> 40-60%</div><div><strong>Min Quote:</strong> R' + minQuote + '</div><div><strong>Max Quote:</strong> R' + maxQuote + '</div></div></div><div class="customer-info"><h3>👤 Customer Details</h3><div class="info-row"><span class="info-label">Name:</span><span class="info-value">' + ci.name + '</span></div><div class="info-row"><span class="info-label">Email:</span><span class="info-value">' + ci.email + '</span></div><div class="info-row"><span class="info-label">Phone:</span><span class="info-value">' + (ci.phone || 'N/A') + '</span></div><div class="info-row"><span class="info-label">Message:</span><span class="info-value">' + (ci.message || 'None') + '</span></div><div class="info-row"><span class="info-label">Quote ID:</span><span class="info-value">#' + qid + '</span></div><div class="info-row"><span class="info-label">Items Count:</span><span class="info-value">' + itemsCount + ' items</span></div></div><div class="priority-notice"><strong>⚡ URGENT ACTION REQUIRED</strong><br>Send quote within 24 hours to maintain customer interest<br><small>Quick response = Higher conversion rate</small></div><div style="background:#f3f4f6;padding:20px;border-radius:8px;margin:20px 0"><h4 style="margin:0 0 15px;color:#1f2937">📋 Next Steps:</h4><ol style="margin:0;padding-left:20px;color:#374151"><li>Review customer cart items and quantities</li><li>Calculate competitive pricing (40-60% margin recommended)</li><li>Prepare quote email with CRBFTN branding</li><li>Include delivery timeline and payment terms</li><li>Send quote within 24 hours for best conversion</li></ol></div><div class="timestamp">Quote Requested: ' + timestamp + '</div></div><div class="footer"><h3>CRBFTN Business Dashboard</h3><p>📍 Makhado, Limpopo, South Africa</p><p>📧 crabfontain@gmail.com</p><p>📱 +27 68 000 3578</p><p style="margin-top:20px;font-size:12px;opacity:.6">This notification was generated automatically from your CRBFTN website cart system.</p></div></div></body></html>' 
      });
      
      await transporter.sendMail({ 
        from: process.env.EMAIL_USER, 
        to: ci.email, 
        subject: '✅ Quote Request Confirmed - CRBFTN #' + qid, 
        html: '<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f9fafb;color:#1f2937}.container{max-width:600px;margin:0 auto;background-color:#fff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#dc2626,#1d4ed8);color:#fff;padding:40px 30px;text-align:center}.header h1{margin:0;font-size:32px;font-weight:700;letter-spacing:2px}.header p{margin:10px 0 0;font-size:16px;opacity:.9}.content{padding:40px 30px}.confirmation{text-align:center;background:linear-gradient(135deg,#d1fae5,#a7f3d0);padding:30px;border-radius:12px;margin-bottom:30px;border:2px solid #10b981}.confirmation h2{margin:0 0 15px;color:#047857;font-size:24px}.confirmation p{margin:0;font-size:16px;color:#374151}.quote-info{background:#f3f4f6;border-radius:12px;padding:25px;margin:25px 0;border-left:4px solid #1d4ed8}.quote-info h3{margin:0 0 15px;color:#1d4ed8;font-size:18px}.cart-summary{background:#f9fafb;border-radius:12px;padding:25px;margin:25px 0}.cart-summary h3{margin:0 0 20px;color:#1f2937;font-size:18px;text-align:center}.cart-item{display:flex;justify-content:space-between;align-items:center;padding:12px 15px;background:#fff;border-radius:8px;margin-bottom:10px;border:1px solid #e5e7eb}.item-details{flex:1}.item-name{font-weight:600;color:#1f2937;font-size:14px}.item-specs{color:#6b7280;font-size:12px;margin-top:3px}.item-price{font-weight:600;color:#dc2626;font-size:14px}.total-section{background:linear-gradient(135deg,#1f2937,#374151);color:#fff;border-radius:12px;padding:25px;margin:25px 0;text-align:center}.total-section h3{margin:0 0 15px;font-size:18px}.total-amount{font-size:28px;font-weight:700;color:#dc2626;margin:10px 0}.next-steps{background:linear-gradient(135deg,#fee2e2,#dbeafe);border-radius:12px;padding:25px;margin:25px 0}.next-steps h3{margin:0 0 15px;color:#dc2626;font-size:18px}.step{display:flex;align-items:flex-start;margin:15px 0}.step-number{background:#dc2626;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:12px;margin-right:15px;flex-shrink:0}.step-content{flex:1;color:#374151}.business-info{background:#1f2937;color:#fff;border-radius:12px;padding:30px;margin:30px 0;text-align:center}.business-info h3{margin:0 0 20px;color:#dc2626;font-size:20px}.contact-detail{display:flex;align-items:center;justify-content:center;margin:10px 0;font-size:14px}.guarantee-badge{background:#d1fae5;border:2px solid #10b981;border-radius:12px;padding:20px;text-align:center;margin:20px 0}.guarantee-badge h4{margin:0 0 10px;color:#047857;font-size:16px}.guarantee-badge p{margin:0;color:#374151;font-size:14px}.reference-info{background:#fee2e2;border:2px solid #dc2626;border-radius:8px;padding:15px;margin:15px 0;text-align:center}.reference-info strong{color:#dc2626;font-size:16px}.footer{background:#f3f4f6;padding:20px 30px;text-align:center;color:#6b7280;font-size:12px}</style></head><body><div class="container"><div class="header"><h1>CRBFTN</h1><p>Style Redefined - Quote Request Confirmed</p></div><div class="content"><div class="confirmation"><h2>✅ Quote Request Received!</h2><p>Thank you for your interest in CRBFTN. We\'re preparing your personalized quote and will send it within 24 hours.</p></div><div class="quote-info"><h3>📋 Quote Details</h3><p><strong>Customer Name:</strong> ' + ci.name + '</p><p><strong>Customer Email:</strong> ' + ci.email + '</p><p><strong>Your Message:</strong> ' + (ci.message || 'No additional message') + '</p><p><strong>Reference Number:</strong> #' + qid + '</p><p><strong>Items Requested:</strong> ' + itemsCount + ' items</p><p><strong>Estimated Value:</strong> R' + total.toFixed(2) + '</p><p><strong>Quote Status:</strong> Processing</p><p><strong>Expected Response:</strong> Within 24 hours</p></div><div class="cart-summary"><h3>🛍️ Your Requested Items</h3>' + cartItemsHtml + '</div><div class="total-section"><h3>💰 Estimated Total</h3><div class="total-amount">R' + total.toFixed(2) + '</div><p><small>Final pricing will be provided in your personalized quote</small></p></div><div class="next-steps"><h3>📞 What Happens Next?</h3><div class="step"><div class="step-number">1</div><div class="step-content"><strong>Quote Preparation</strong><br>Our team reviews your items and prepares competitive pricing</div></div><div class="step"><div class="step-number">2</div><div class="step-content"><strong>Personalized Quote</strong><br>You\'ll receive a detailed quote via email within 24 hours</div></div><div class="step"><div class="step-number">3</div><div class="step-content"><strong>Order Confirmation</strong><br>Accept the quote and we\'ll begin processing your order</div></div><div class="step"><div class="step-number">4</div><div class="step-content"><strong>Fast Delivery</strong><br>Your premium CRBFTN items will be delivered within 3-5 days</div></div></div><div class="guarantee-badge"><h4>🛡️ CRBFTN Guarantee</h4><p>Premium quality • Fast delivery • 30-day returns • Excellent customer service</p></div><div class="reference-info"><strong>📞 Need to contact us about this quote?</strong><br>Reference: #' + qid + '</div><div class="business-info"><h3>📍 Contact Information</h3><div class="contact-detail"><span>🏢</span> CRBFTN - Premium Clothing Brand</div><div class="contact-detail"><span>📍</span> Makhado, Limpopo, South Africa</div><div class="contact-detail"><span>📧</span> crabfontain@gmail.com</div><div class="contact-detail"><span>📱</span> +27 68 000 3578</div><div class="contact-detail"><span>🕒</span> Mon-Fri: 9AM-5PM SAST</div></div></div><div class="footer"><p>This email was sent because you requested a quote from CRBFTN.</p><p>CRBFTN © 2025 - Crafted with ❤️ in Makhado, Limpopo, South Africa</p></div></div></body></html>' 
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