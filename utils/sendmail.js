const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY || '');

const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;
const OFFICIAL_VIEWERS_CC = process.env.OFFICIAL_VIEWERS_CC?.split(',').filter(Boolean) || [];
const OFFICIAL_VIEWERS_BCC = process.env.OFFICIAL_VIEWERS_BCC?.split(',').filter(Boolean) || [];

if (!process.env.RESEND_API_KEY) console.warn('⚠️ Missing RESEND_API_KEY');
if (!RECEIVER_EMAIL) console.warn('⚠️ Missing RECEIVER_EMAIL');

function createHtmlTemplate({ title, body, footer }) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 24px; border-radius: 8px; background-color: #f9f9f9; color: #333; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <h2 style="color: #2c3e50;">${title}</h2>
      <div style="margin: 16px 0; line-height: 1.6;">
        ${body}
      </div>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
      <p style="font-size: 14px; color: #888;">${footer}</p>
    </div>
  `;
}

async function sendMail({ name, email, project, message }) {
  const subject = `New message about "${project}" from ${name}`;

  const html = createHtmlTemplate({
    title: '📥 New Project Inquiry',
    body: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Project:</strong> ${project}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
    footer: 'Sent via FourG Nepal Contact Form',
  });

  const confirmationHtml = createHtmlTemplate({
    title: `✅ Hello ${name}, we've received your message!`,
    body: `
      <p>Thank you for reaching out about <strong>${project}</strong>.</p>
      <p>Here's a copy of your message:</p>
      <blockquote style="background: #fff; padding: 12px; border-left: 4px solid #ccc;">${message}</blockquote>
      <p>Our team will respond to you shortly.</p>
    `,
    footer: 'FourG Nepal Team',
  });

  try {
    const adminEmailResponse = await resend.emails.send({
      from: `FourG Nepal <${RECEIVER_EMAIL}>`,
      to: [RECEIVER_EMAIL],
      cc: OFFICIAL_VIEWERS_CC,
      bcc: OFFICIAL_VIEWERS_BCC,
      subject,
      reply_to: email,
      html,
    });

    console.log('📩 Admin email sent:', adminEmailResponse);

    const senderEmailResponse = await resend.emails.send({
      from: `FourG Nepal <${RECEIVER_EMAIL}>`,
      to: [email],
      subject: `Confirmation: Your message about "${project}"`,
      html: confirmationHtml,
    });

    console.log('📨 Confirmation email sent:', senderEmailResponse);

    return { success: true };
  } catch (error) {
    console.error('❌ Error sending emails:', error?.message || error);
    return { success: false, error };
  }
}

module.exports = sendMail;
