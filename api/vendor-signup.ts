import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY || 're_Zw5Fxqdd_7Uohg2Murj52jR9Q5vXPFdxz');

interface VendorFormData {
  name: string;
  email: string;
  businessName: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
  existingPlatform?: string;
  address?: string;
  city?: string;
  country?: string;
  additionalInfo?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: VendorFormData = req.body;

    // Email to Admin (Upsessed)
    await resend.emails.send({
      from: 'Upsessed <onboarding@resend.dev>',
      to: 'upsessedmarketplace@gmail.com',
      subject: `New Vendor Signup: ${formData.businessName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 24px; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
              .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #10b981; }
              .section h2 { margin-top: 0; color: #10b981; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
              .field { margin-bottom: 12px; }
              .label { font-weight: 600; color: #6b7280; font-size: 12px; text-transform: uppercase; }
              .value { color: #111827; font-size: 15px; margin-top: 4px; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✨ New Vendor Signup</h1>
              </div>
              <div class="content">

                <div class="section">
                  <h2>Contact Information</h2>
                  <div class="field">
                    <div class="label">Name</div>
                    <div class="value">${formData.name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value">${formData.email}</div>
                  </div>
                  <div class="field">
                    <div class="label">Business Name</div>
                    <div class="value">${formData.businessName}</div>
                  </div>
                  ${formData.phone ? `
                  <div class="field">
                    <div class="label">Phone</div>
                    <div class="value">${formData.phone}</div>
                  </div>
                  ` : ''}
                </div>

                ${formData.city || formData.country || formData.address ? `
                <div class="section">
                  <h2>Location</h2>
                  ${formData.city ? `
                  <div class="field">
                    <div class="label">City</div>
                    <div class="value">${formData.city}</div>
                  </div>
                  ` : ''}
                  ${formData.country ? `
                  <div class="field">
                    <div class="label">Country</div>
                    <div class="value">${formData.country}</div>
                  </div>
                  ` : ''}
                  ${formData.address ? `
                  <div class="field">
                    <div class="label">Address</div>
                    <div class="value">${formData.address}</div>
                  </div>
                  ` : ''}
                </div>
                ` : ''}

                ${formData.instagram || formData.facebook || formData.tiktok ? `
                <div class="section">
                  <h2>Social Media</h2>
                  ${formData.instagram ? `
                  <div class="field">
                    <div class="label">Instagram</div>
                    <div class="value">${formData.instagram}</div>
                  </div>
                  ` : ''}
                  ${formData.facebook ? `
                  <div class="field">
                    <div class="label">Facebook</div>
                    <div class="value">${formData.facebook}</div>
                  </div>
                  ` : ''}
                  ${formData.tiktok ? `
                  <div class="field">
                    <div class="label">TikTok</div>
                    <div class="value">${formData.tiktok}</div>
                  </div>
                  ` : ''}
                </div>
                ` : ''}

                ${formData.website || formData.existingPlatform ? `
                <div class="section">
                  <h2>Online Presence</h2>
                  ${formData.website ? `
                  <div class="field">
                    <div class="label">Website</div>
                    <div class="value"><a href="${formData.website}" style="color: #10b981;">${formData.website}</a></div>
                  </div>
                  ` : ''}
                  ${formData.existingPlatform ? `
                  <div class="field">
                    <div class="label">Existing Platform</div>
                    <div class="value">${formData.existingPlatform}</div>
                  </div>
                  ` : ''}
                </div>
                ` : ''}

                ${formData.additionalInfo ? `
                <div class="section">
                  <h2>Additional Information</h2>
                  <div class="value">${formData.additionalInfo.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}

              </div>
              <div class="footer">
                <p>Submitted from Upsessed Vendor Signup Form</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Confirmation Email to Vendor
    await resend.emails.send({
      from: 'Upsessed <onboarding@resend.dev>',
      to: formData.email,
      subject: 'Welcome to Upsessed! We\'ll be in touch soon',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 50px 30px; text-align: center; }
              .logo { font-size: 36px; color: white; font-weight: bold; margin-bottom: 10px; }
              .tagline { color: rgba(255,255,255,0.9); font-size: 18px; }
              .content { padding: 40px 30px; background: white; }
              .content h2 { color: #111827; font-size: 24px; margin-bottom: 20px; }
              .content p { color: #4b5563; font-size: 16px; margin-bottom: 16px; }
              .highlight-box { background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 8px; }
              .highlight-box h3 { color: #10b981; margin-top: 0; font-size: 18px; }
              .benefit-list { list-style: none; padding: 0; }
              .benefit-list li { padding: 10px 0; padding-left: 30px; position: relative; color: #374151; }
              .benefit-list li:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; font-size: 18px; }
              .footer { background: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
              .social-links { margin-top: 20px; }
              .social-links a { color: #10b981; text-decoration: none; margin: 0 10px; }
              .cta-button { display: inline-block; background: #10b981; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Up<span style="color: #34d399;">^</span>sessed</div>
                <div class="tagline">The Future of Thrift is Here</div>
              </div>

              <div class="content">
                <h2>Hey ${formData.name}! 👋</h2>

                <p>Thank you for your interest in joining <strong>Upsessed</strong>! We're thrilled that ${formData.businessName} wants to be part of the future of thrift.</p>

                <p>We've received your application and our team will review it shortly. Here's what happens next:</p>

                <div class="highlight-box">
                  <h3>Next Steps:</h3>
                  <ul class="benefit-list">
                    <li>Our team will review your application within 2-3 business days</li>
                    <li>We'll reach out via email with next steps and onboarding details</li>
                    <li>Early vendors get priority placement when we launch!</li>
                  </ul>
                </div>

                <p>While you wait, feel free to explore what makes Upsessed special:</p>

                <ul class="benefit-list">
                  <li><strong>100% Free</strong> to join and set up your store</li>
                  <li><strong>Global Reach</strong> - Connect with thrifters worldwide</li>
                  <li><strong>Easy Integration</strong> - Works with your Instagram, website, or standalone</li>
                  <li><strong>Low Commission</strong> - Around 10%, lower than most platforms</li>
                </ul>

                <p style="text-align: center;">
                  <a href="https://www.upsessed.com" class="cta-button">Visit Our Website</a>
                </p>

                <p>Have questions? Just reply to this email - we'd love to hear from you!</p>

                <p style="margin-top: 30px; color: #10b981; font-weight: 600; font-size: 18px;">Stay Upsessed ✨</p>

                <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                  - The Upsessed Team
                </p>
              </div>

              <div class="footer">
                <p><strong>Upsessed</strong> - Bringing thrift culture together, one store at a time.</p>
                <div class="social-links">
                  <a href="https://instagram.com/up_sessed">Instagram</a> |
                  <a href="https://www.upsessed.com">Website</a> |
                  <a href="mailto:upsessedmarketplace@gmail.com">Email</a>
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                  © ${new Date().getFullYear()} Upsessed. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).json({ error: 'Failed to send emails' });
  }
}
