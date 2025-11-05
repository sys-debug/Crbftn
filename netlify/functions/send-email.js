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

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse request body
        const data = JSON.parse(event.body);
        const { type, formData, templateData } = data;

        // Validate required fields
        if (!type || !formData) {
            return {
                statusCode: 400,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Missing required fields: type, formData' })
            };
        }

        // Get environment variables
        const {
            EMAIL_USER,
            EMAIL_PASS,
            EMAIL_TO
        } = process.env;

        // Validate SMTP configuration
        if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
            console.error('Missing SMTP configuration:', {
                EMAIL_USER: !!EMAIL_USER,
                EMAIL_PASS: !!EMAIL_PASS,
                EMAIL_TO: !!EMAIL_TO
            });
            return {
                statusCode: 500,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'SMTP configuration incomplete' })
            };
        }

        // Create transporter (same as working Mulambwane site)
        console.log('📧 Creating transporter...');
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        const emailsSent = [];

        switch (type) {
            case 'contact':
                await sendContactEmails(transporter, formData, templateData, EMAIL_TO, emailsSent);
                break;
            case 'quote':
                await sendQuoteEmails(transporter, formData, templateData, EMAIL_TO, emailsSent);
                break;
            default:
                return {
                    statusCode: 400,
                    headers: { 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ error: 'Invalid email type' })
                };
        }

        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ 
                success: true, 
                message: `Emails sent successfully`,
                emailsSent: emailsSent.length
            })
        };

    } catch (error) {
        console.error('Email sending error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack,
            envVars: {
                hasUser: !!EMAIL_USER,
                hasPass: !!EMAIL_PASS,
                hasTo: !!EMAIL_TO
            }
        });
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ 
                error: 'Failed to send email',
                details: error.message,
                code: error.code || 'UNKNOWN'
            })
        };
    }
};

// Send contact form emails (business notification + customer thank you)
async function sendContactEmails(transporter, formData, templateData, businessEmail, emailsSent) {
    const { firstName, lastName, email, subject, message, submissionDate } = formData;
    
    // Business notification email
    const businessEmailContent = generateContactBusinessEmail({
        firstName,
        lastName,
        email,
        subject,
        message,
        submissionDate
    });

    await transporter.sendMail({
        from: `"CRBFTN Website" <${process.env.EMAIL_USER}>`,
        to: businessEmail,
        subject: `New CRBFTN Contact Form Submission from ${firstName} ${lastName}`,
        html: businessEmailContent
    });
    emailsSent.push('business-notification');

    // Customer thank you email
    const customerEmailContent = generateContactCustomerEmail({
        firstName,
        lastName,
        subject,
        submissionDate
    });

    await transporter.sendMail({
        from: `"CRBFTN" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting CRBFTN - We\'ll be in touch soon!',
        html: customerEmailContent
    });
    emailsSent.push('customer-thankyou');
}

// Send quote request emails (business notification + customer confirmation)
async function sendQuoteEmails(transporter, formData, templateData, businessEmail, emailsSent) {
    const { 
        customerEmail, 
        customerName, 
        customerMessage, 
        items, 
        totalAmount, 
        itemsCount, 
        timestamp,
        quoteId 
    } = formData;

    // Business notification email
    const businessEmailContent = generateQuoteBusinessEmail({
        customerEmail,
        customerName,
        customerMessage,
        items,
        totalAmount,
        itemsCount,
        timestamp,
        quoteId
    });

    await transporter.sendMail({
        from: `"CRBFTN Website" <${process.env.EMAIL_USER}>`,
        to: businessEmail,
        subject: `New CRBFTN Quote Request from ${customerName || 'Customer'}`,
        html: businessEmailContent
    });
    emailsSent.push('quote-business');

    // Customer confirmation email
    const customerEmailContent = generateQuoteCustomerEmail({
        customerEmail,
        customerName,
        customerMessage,
        items,
        totalAmount,
        itemsCount,
        timestamp,
        quoteId
    });

    await transporter.sendMail({
        from: `"CRBFTN" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: 'Your CRBFTN Quote Request - We\'re Preparing Your Custom Quote!',
        html: customerEmailContent
    });
    emailsSent.push('quote-customer');
}

// Generate contact business notification email HTML
function generateContactBusinessEmail(data) {
    const { firstName, lastName, email, subject, message, submissionDate } = data;
    const timestamp = new Date(submissionDate).toLocaleString();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #dc2626; }
        .label { font-weight: bold; color: #1f2937; }
        .value { margin-top: 5px; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔥 New Contact Form Submission</h1>
            <p>CRBFTN Website Contact Form</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">👤 Customer Name:</div>
                <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
                <div class="label">📧 Email Address:</div>
                <div class="value">${email}</div>
            </div>
            <div class="field">
                <div class="label">📋 Subject:</div>
                <div class="value">${subject}</div>
            </div>
            <div class="field">
                <div class="label">⏰ Submitted:</div>
                <div class="value">${timestamp}</div>
            </div>
            <div class="message-box">
                <div class="label">💬 Message:</div>
                <div class="value">${message}</div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// Generate contact customer thank you email HTML
function generateContactCustomerEmail(data) {
    const { firstName, lastName, subject, submissionDate } = data;
    const timestamp = new Date(submissionDate).toLocaleString();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Thank You!</h1>
            <p>Your message has been received</p>
        </div>
        <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thank you for contacting CRBFTN! We've received your message about "${subject}" and will get back to you within 24 hours.</p>
            <div class="highlight">
                <p><strong>What happens next?</strong></p>
                <p>• Our team will review your message<br>
                • We'll respond within 1 business day<br>
                • You'll receive our reply at ${data.email || 'your email address'}</p>
            </div>
            <p>Best regards,<br>The CRBFTN Team</p>
            <p><small>Submitted: ${timestamp}</small></p>
        </div>
    </div>
</body>
</html>`;
}

// Generate quote business notification email HTML
function generateQuoteBusinessEmail(data) {
    const { customerEmail, customerName, customerMessage, items, totalAmount, itemsCount, timestamp, quoteId } = data;
    const itemsHtml = items.map(item => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">${item.name}</td>
            <td style="padding: 10px; text-align: center;">${item.size}</td>
            <td style="padding: 10px; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right;">R${item.price}</td>
            <td style="padding: 10px; text-align: right; font-weight: bold;">R${item.total}</td>
        </tr>
    `).join('');
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .customer-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1d4ed8; }
        .items-table { width: 100%; background: white; border-radius: 8px; overflow: hidden; margin: 20px 0; }
        .items-table th { background: #1f2937; color: white; padding: 12px; text-align: left; }
        .items-table td { padding: 10px; }
        .total { background: #dc2626; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛒 New Quote Request</h1>
            <p>Quote ID: ${quoteId}</p>
        </div>
        <div class="content">
            <div class="customer-info">
                <h3>👤 Customer Details</h3>
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                <p><strong>Message:</strong> ${customerMessage}</p>
                <p><strong>Items:</strong> ${itemsCount} items</p>
                <p><strong>Requested:</strong> ${new Date(timestamp).toLocaleString()}</p>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th style="text-align: center;">Size</th>
                        <th style="text-align: center;">Qty</th>
                        <th style="text-align: right;">Price</th>
                        <th style="text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            
            <div class="total">
                Estimated Total: R${totalAmount.toFixed(2)}
            </div>
            
            <p><strong>⚡ Action Required:</strong> Send quote within 24 hours for best conversion rates.</p>
        </div>
    </div>
</body>
</html>`;
}

// Generate quote customer confirmation email HTML
function generateQuoteCustomerEmail(data) {
    const { customerEmail, customerName, customerMessage, items, totalAmount, itemsCount, timestamp, quoteId } = data;
    const itemsHtml = items.map(item => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">${item.name}</td>
            <td style="padding: 10px; text-align: center;">${item.size}</td>
            <td style="padding: 10px; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right;">R${item.price}</td>
        </tr>
    `).join('');
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .quote-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
        .items-table { width: 100%; background: white; border-radius: 8px; overflow: hidden; margin: 20px 0; }
        .items-table th { background: #1f2937; color: white; padding: 12px; text-align: left; }
        .next-steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .step { display: flex; margin: 10px 0; }
        .step-number { background: #dc2626; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Quote Request Received!</h1>
            <p>We're preparing your personalized quote</p>
        </div>
        <div class="content">
            <p>Hi ${customerName},</p>
            <p>Thank you for your interest in CRBFTN! We've received your quote request and will send you a personalized quote within 24 hours.</p>
            
            <div class="quote-info">
                <h3>📋 Quote Details</h3>
                <p><strong>Quote ID:</strong> ${quoteId}</p>
                <p><strong>Items Requested:</strong> ${itemsCount} items</p>
                <p><strong>Estimated Value:</strong> R${totalAmount.toFixed(2)}</p>
                <p><strong>Your Message:</strong> ${customerMessage}</p>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th style="text-align: center;">Size</th>
                        <th style="text-align: center;">Qty</th>
                        <th style="text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            
            <div class="next-steps">
                <h3>📞 What Happens Next?</h3>
                <div class="step">
                    <div class="step-number">1</div>
                    <div>Our team reviews your items and prepares competitive pricing</div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div>You'll receive a detailed quote via email within 24 hours</div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div>We'll call you within 24-48 hours to discuss your order</div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div>Payment and delivery coordination once you approve</div>
                </div>
            </div>
            
            <div class="quote-info">
                <h3>💳 Payment Information</h3>
                <p><strong>Bank:</strong> FNB</p>
                <p><strong>Account Name:</strong> CRBFTN Clothing</p>
                <p><strong>Account Number:</strong> 6241 7894 123</p>
                <p><strong>Branch Code:</strong> 250 655</p>
                <p><strong>Reference:</strong> ${quoteId}</p>
                <p style="color: #dc2626; font-weight: bold;">⚠️ Please use your Quote ID as payment reference</p>
            </div>
            
            <div class="quote-info">
                <h3>📞 Contact Timeline</h3>
                <p><strong>Quote Delivery:</strong> Within 24 hours via email</p>
                <p><strong>Phone Call:</strong> Within 24-48 hours to discuss details</p>
                <p><strong>Order Processing:</strong> 1-2 business days after payment</p>
                <p><strong>Delivery:</strong> 3-5 business days (nationwide)</p>
            </div>
            
            <p>Best regards,<br>The CRBFTN Team</p>
        </div>
    </div>
</body>
</html>`;
}