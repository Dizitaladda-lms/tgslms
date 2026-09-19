const nodemailer = require("nodemailer");

/**
 * Dizital Adda LMS Email Service
 * Handles email verification links and automated purchase invoices / credentials dispatch.
 */

// Determine base URLs for verification and portal links
const getFrontendUrl = () => {
  return (
    process.env.FRONTEND_URL ||
    process.env.CLIENT_URL ||
    (process.env.NODE_ENV === "production" ? "https://tsg-ecru.vercel.app" : "http://localhost:5173")
  ).replace(/\/+$/, "");
};

const getBackendUrl = () => {
  return (
    process.env.BACKEND_URL ||
    (process.env.NODE_ENV === "production" ? "https://tsg-qlb1.onrender.com" : "http://localhost:5000")
  ).replace(/\/+$/, "");
};

// Create Nodemailer Transporter
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Fallback: If SMTP credentials not provided in .env, return null to trigger graceful mock logger
  return null;
};

/**
 * 1. SEND EMAIL VERIFICATION LINK
 */
const sendVerificationEmail = async ({ to, name, token }) => {
  const recipientEmail = String(to).trim().toLowerCase();
  const studentName = name || "Student";
  const frontendUrl = getFrontendUrl();
  const backendUrl = getBackendUrl();

  const verificationUrl = `${frontendUrl}/verify-email?token=${token}&email=${encodeURIComponent(recipientEmail)}`;
  const directApiUrl = `${backendUrl}/api/auth/verify-email?token=${token}`;

  const mailFrom = process.env.EMAIL_FROM || '"Dizital Adda LMS" <info@dizitaladda.com>';
  const subject = "Verify Your Email Address - Dizital Adda LMS";

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0B1220; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; }
    .wrapper { width: 100%; background-color: #0B1220; padding: 40px 10px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
    .header { background: linear-gradient(135deg, #0B1220 0%, #16243D 100%); padding: 36px 30px; text-align: center; border-bottom: 4px solid #D4A017; }
    .logo-text { font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; }
    .logo-sub { font-size: 12px; color: #D4A017; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; margin-top: 4px; }
    .content { padding: 36px 32px; }
    .greeting { font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 12px; }
    .desc { font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
    .badge-box { background-color: #fefce8; border: 1px solid #fef08a; border-radius: 12px; padding: 14px 18px; margin-bottom: 28px; }
    .badge-text { font-size: 13px; color: #854d0e; font-weight: 600; margin: 0; }
    .btn-container { text-align: center; margin: 32px 0; }
    .verify-btn { display: inline-block; background: linear-gradient(135deg, #7C2D12 0%, #D4A017 100%); color: #ffffff !important; text-decoration: none; padding: 16px 36px; border-radius: 10px; font-size: 16px; font-weight: 800; box-shadow: 0 8px 20px rgba(124, 45, 18, 0.35); text-transform: uppercase; letter-spacing: 0.5px; }
    .alt-link { font-size: 12px; color: #64748b; line-height: 1.5; word-break: break-all; margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    .alt-link a { color: #7C2D12; font-weight: bold; }
    .footer { background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 12px; color: #94a3b8; margin: 0 0 6px 0; }
    .footer-link { color: #64748b; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo-text">DIZITAL ADDA LMS</h1>
        <div class="logo-sub">Official Student Admission Portal</div>
      </div>
      <div class="content">
        <h2 class="greeting">Hello, ${studentName}! 👋</h2>
        <p class="desc">
          Thank you for initiating your course admission at <strong>Dizital Adda LMS</strong>.
          To complete your enrollment and activate your student portal, please verify your email address.
        </p>

        <div class="badge-box">
          <p class="badge-text">
            🔒 <strong>Verification Required:</strong> Your course access and login credentials will be linked to this email address (<strong>${recipientEmail}</strong>).
          </p>
        </div>

        <div class="btn-container">
          <a href="${verificationUrl}" target="_blank" class="verify-btn">
            ✅ Verify Email Address
          </a>
        </div>

        <p class="desc" style="font-size: 13px; color: #64748b; text-align: center;">
          This verification button is valid for <strong>24 hours</strong>. If you did not initiate this request, you can safely disregard this email.
        </p>

        <div class="alt-link">
          <strong>Button not working?</strong> Copy and paste this URL into your browser:<br />
          <a href="${verificationUrl}">${verificationUrl}</a>
        </div>
      </div>

      <div class="footer">
        <p class="footer-text">© ${new Date().getFullYear()} Dizital Adda. All rights reserved.</p>
        <p class="footer-text">
          Need assistance? Contact our Admissions Desk at 
          <a href="tel:+918810606010" class="footer-link">+91 8810606010</a> or 
          <a href="mailto:info@dizitaladda.com" class="footer-link">info@dizitaladda.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const textContent = `
Hello ${studentName},

Please verify your email address to complete your course admission at Dizital Adda LMS.
Click the following link to verify your email:
${verificationUrl}

This link is valid for 24 hours.

Regards,
Admissions Team, Dizital Adda LMS
  `.trim();

  const transporter = createTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: mailFrom,
        to: recipientEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[Email Service] Verification email sent to ${recipientEmail}: ${info.messageId}`);
      return { success: true, messageId: info.messageId, previewUrl: verificationUrl };
    } catch (err) {
      console.error("[Email Service] SMTP Error sending verification email:", err.message);
      // Don't crash checkout flow on SMTP failure; log fallback
    }
  }

  // Graceful Local / Dev Mock Logger
  console.log("=========================================================");
  console.log("📨 [MOCK EMAIL DISPATCH] EMAIL VERIFICATION LINK");
  console.log(`To: ${recipientEmail} (${studentName})`);
  console.log(`Subject: ${subject}`);
  console.log(`Direct Verification URL: ${verificationUrl}`);
  console.log(`Direct API URL: ${directApiUrl}`);
  console.log("=========================================================");

  return { success: true, mocked: true, previewUrl: verificationUrl };
};

/**
 * 2. SEND COURSE PURCHASE INVOICE & STUDENT CREDENTIALS EMAIL
 */
const sendCoursePurchaseInvoiceEmail = async ({
  to,
  name,
  studentId,
  tempPassword,
  course,
  payment,
  invoiceNumber,
}) => {
  const recipientEmail = String(to).trim().toLowerCase();
  const studentName = name || "Student";
  const frontendUrl = getFrontendUrl();
  const loginUrl = `${frontendUrl}/login`;

  const courseTitle = course?.title || "Specialized Certification Program";
  const courseDuration = course?.duration || "6 Months";
  const courseCode = course?.course_id || course?.id || "FLAGSHIP";
  const amountPaid = Number(payment?.amount || course?.price || 0);
  const paymentId = payment?.paymentId || payment?.razorpay_payment_id || `PAY-${Date.now()}`;
  const invNo = invoiceNumber || `INV-${Date.now().toString().slice(-6)}`;
  const dateFormatted = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const mailFrom = process.env.EMAIL_FROM || '"Dizital Adda LMS" <info@dizitaladda.com>';
  const subject = `Admission Confirmed & Official Invoice: ${courseTitle} - Dizital Adda`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0B1220; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; }
    .wrapper { width: 100%; background-color: #0B1220; padding: 30px 10px; }
    .container { max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.35); }
    .header { background: linear-gradient(135deg, #0B1220 0%, #16243D 100%); padding: 32px 28px; text-align: center; border-bottom: 4px solid #D4A017; }
    .logo-text { font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin: 0; }
    .logo-sub { font-size: 11px; color: #D4A017; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; margin-top: 4px; }
    .content { padding: 32px 28px; }
    .badge-success { display: inline-block; background-color: #ecfdf5; border: 1px solid #6ee7b7; color: #047857; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 6px 14px; border-radius: 20px; margin-bottom: 12px; }
    .greeting { font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 8px; }
    .desc { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px; }
    
    /* Credentials Card */
    .cred-card { background-color: #0f172a; border-radius: 14px; padding: 22px 24px; color: #ffffff; margin-bottom: 28px; border: 1px solid #334155; }
    .cred-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #D4A017; letter-spacing: 1.5px; margin: 0 0 14px 0; border-bottom: 1px solid #334155; padding-bottom: 8px; }
    .cred-grid { width: 100%; border-collapse: collapse; }
    .cred-grid td { padding: 7px 0; font-size: 14px; vertical-align: top; }
    .cred-label { color: #94a3b8; width: 40%; font-weight: 600; }
    .cred-val { color: #ffffff; font-weight: 800; font-family: 'Courier New', Courier, monospace; }
    .cred-val.pass { color: #D4A017; font-size: 16px; letter-spacing: 1px; }

    /* Program Details */
    .program-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 28px; }
    .program-title { font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; }
    .program-meta { font-size: 13px; color: #64748b; font-weight: 600; }

    /* Invoice Table */
    .inv-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
    .inv-title { font-size: 15px; font-weight: 800; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
    .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
    .inv-table th { background-color: #f1f5f9; color: #475569; text-align: left; padding: 10px 12px; font-weight: 700; border-bottom: 2px solid #cbd5e1; }
    .inv-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155; }
    .inv-total { font-weight: 800; font-size: 16px; color: #047857; }

    .btn-container { text-align: center; margin: 28px 0; }
    .portal-btn { display: inline-block; background: linear-gradient(135deg, #7C2D12 0%, #D4A017 100%); color: #ffffff !important; text-decoration: none; padding: 16px 36px; border-radius: 10px; font-size: 15px; font-weight: 800; box-shadow: 0 8px 20px rgba(124, 45, 18, 0.35); text-transform: uppercase; letter-spacing: 0.5px; }
    
    .notice { font-size: 12px; color: #64748b; line-height: 1.5; background-color: #fefce8; border-left: 4px solid #D4A017; padding: 12px 14px; border-radius: 0 8px 8px 0; margin-bottom: 20px; }
    .footer { background-color: #f8fafc; padding: 24px 28px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer-text { font-size: 12px; color: #94a3b8; margin: 0 0 6px 0; }
    .footer-link { color: #64748b; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo-text">DIZITAL ADDA LMS</h1>
        <div class="logo-sub">Official Student Admission Receipt & Credentials</div>
      </div>
      <div class="content">
        <div class="badge-success">Admission Activated & Paid</div>
        <h2 class="greeting">Congratulations, ${studentName}! 🎉</h2>
        <p class="desc">
          We are thrilled to welcome you to <strong>Dizital Adda</strong>. Your admission has been successfully processed, your seat is confirmed, and your dedicated learning portal is now active.
        </p>

        <!-- CREDENTIALS BOX -->
        <div class="cred-card">
          <div class="cred-title">🔑 Official Portal Login Credentials</div>
          <table class="cred-grid">
            <tr>
              <td class="cred-label">Portal URL:</td>
              <td class="cred-val">${loginUrl}</td>
            </tr>
            <tr>
              <td class="cred-label">Username (Email):</td>
              <td class="cred-val">${recipientEmail}</td>
            </tr>
            <tr>
              <td class="cred-label">Student Roll ID:</td>
              <td class="cred-val" style="color: #38bdf8;">${studentId}</td>
            </tr>
            <tr>
              <td class="cred-label">Temporary Password:</td>
              <td class="cred-val pass">${tempPassword}</td>
            </tr>
          </table>
        </div>

        <div class="btn-container">
          <a href="${loginUrl}" target="_blank" class="portal-btn">
            🚀 Launch Student Portal & Start Learning
          </a>
        </div>

        <!-- PROGRAM DETAILS -->
        <div class="program-box">
          <h3 class="program-title">Enrolled Program: ${courseTitle}</h3>
          <div class="program-meta">
            Duration: ${courseDuration} • Course Code: ${courseCode} • Lifetime Portal Access
          </div>
        </div>

        <!-- TAX INVOICE -->
        <h3 class="inv-title" style="margin-bottom: 10px;">Official Enrollment Invoice</h3>
        <table class="inv-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Reference</th>
              <th>Date</th>
              <th style="text-align: right;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${courseTitle}</strong><br /><span style="font-size: 11px; color: #64748b;">Invoice No: ${invNo}</span></td>
              <td>${paymentId}</td>
              <td>${dateFormatted}</td>
              <td style="text-align: right; font-weight: bold;">₹${amountPaid.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right; font-weight: 700;">Total Amount Paid:</td>
              <td style="text-align: right;" class="inv-total">₹${amountPaid.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>

        <div class="notice">
          <strong>Security Tip:</strong> Please log in using your temporary password and update it immediately in your <em>Student Dashboard &rarr; Profile Settings</em>.
        </div>
      </div>

      <div class="footer">
        <p class="footer-text">© ${new Date().getFullYear()} Dizital Adda. All rights reserved.</p>
        <p class="footer-text">
          Questions or billing support? Call 
          <a href="tel:+918810606010" class="footer-link">+91 8810606010</a> or write to 
          <a href="mailto:info@dizitaladda.com" class="footer-link">info@dizitaladda.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const textContent = `
Hello ${studentName},

Congratulations! Your course enrollment for "${courseTitle}" at Dizital Adda is confirmed!

Your Login Credentials:
- Portal URL: ${loginUrl}
- Username: ${recipientEmail}
- Student Roll ID: ${studentId}
- Temporary Password: ${tempPassword}

Invoice Details:
- Invoice No: ${invNo}
- Payment ID: ${paymentId}
- Amount Paid: INR ${amountPaid}
- Date: ${dateFormatted}
- Status: PAID

Please log in and update your password under Profile Settings.

Best regards,
Admissions & Student Success Team, Dizital Adda LMS
  `.trim();

  const transporter = createTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: mailFrom,
        to: recipientEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[Email Service] Invoice & Credentials sent to ${recipientEmail}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error("[Email Service] SMTP Error sending invoice email:", err.message);
    }
  }

  // Graceful Local / Dev Mock Logger
  console.log("=========================================================");
  console.log("📨 [MOCK EMAIL DISPATCH] ADMISSION INVOICE & CREDENTIALS");
  console.log(`To: ${recipientEmail} (${studentName})`);
  console.log(`Subject: ${subject}`);
  console.log(`Student ID: ${studentId}`);
  console.log(`Temp Password: ${tempPassword}`);
  console.log(`Course: ${courseTitle}`);
  console.log(`Payment Ref: ${paymentId}`);
  console.log(`Amount: INR ${amountPaid}`);
  console.log("=========================================================");

  return { success: true, mocked: true };
};

module.exports = {
  sendVerificationEmail,
  sendCoursePurchaseInvoiceEmail,
};
