/**
 * Email Service
 * 
 * Gửi email sử dụng nodemailer với Gmail SMTP.
 * Hỗ trợ: xác thực email, reset password (OTP), thông báo.
 * 
 * Cấu hình Gmail SMTP:
 * - Bật 2FA trên tài khoản Google
 * - Tạo App Password tại https://myaccount.google.com/apppasswords
 * - Sử dụng App Password (12 ký tự) thay cho password thường
 */

const nodemailer = require('nodemailer');

let transporter = null;

/**
 * Tạo transporter kết nối SMTP
 * Trong development: dùng Gmail SMTP nếu có cấu hình
 * Fallback: dùng Ethereal test account
 */
const getTransporter = async () => {
  if (transporter) return transporter;

  // Nếu có Gmail SMTP config → dùng Gmail thật
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    console.log('[Email] Using Gmail SMTP:', process.env.EMAIL_USER);
    return transporter;
  }

  // Fallback: dùng Ethereal fake SMTP (chỉ log URL preview)
  try {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('[Email] Using Ethereal test account:', testAccount.user);
    console.log('[Email] ⚠️  Emails will NOT be delivered to real inbox. Configure Gmail SMTP in .env for real delivery.');
  } catch (err) {
    console.error('[Email] Could not create Ethereal account:', err.message);
  }

  return transporter;
};

/**
 * Gửi email
 * @param {string} to - Email người nhận
 * @param {string} subject - Tiêu đề
 * @param {string} html - Nội dung HTML
 * @returns {Object} Info từ nodemailer
 */
const sendEmail = async (to, subject, html) => {
  try {
    const transport = await getTransporter();
    if (!transport) {
      console.warn('[Email] No transporter available. Email not sent.');
      return null;
    }

    const info = await transport.sendMail({
      from: `"Quản Lý Khóa Học" <${process.env.EMAIL_USER || process.env.EMAIL_FROM || 'noreply@quanlykhoahoc.com'}>`,
      to,
      subject,
      html
    });

    // Log preview URL khi dùng Ethereal
    if (process.env.NODE_ENV !== 'production' && !process.env.EMAIL_USER) {
      console.log('[Email] Preview URL:', nodemailer.getTestMessageUrl(info));
    } else {
      console.log('[Email] Sent to:', to, '| Message ID:', info.messageId);
    }

    return info;
  } catch (error) {
    console.error('[Email] Send error:', error.message);
    throw error;
  }
};

/**
 * Tạo mã OTP 6 chữ số ngẫu nhiên
 * @returns {string} OTP code (ví dụ: "482916")
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Gửi email mã OTP đặt lại mật khẩu
 * @param {string} email - Email người nhận
 * @param {string} otp - Mã OTP 6 chữ số
 * @returns {Object} Info từ nodemailer
 */
const sendOtpEmail = async (email, otp) => {
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc;">
      <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🔐 Mã Xác Nhận</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">Quản Lý Khóa Học</p>
      </div>
      <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p style="color: #374151; font-size: 16px; margin: 0 0 16px 0;">Xin chào,</p>
        <p style="color: #374151; font-size: 16px; margin: 0 0 24px 0;">Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng sử dụng mã OTP bên dưới:</p>
        
        <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 24px 0;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 2px;">Mã OTP của bạn</p>
          <p style="color: #6366f1; font-size: 36px; font-weight: bold; margin: 0; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</p>
        </div>
        
        <p style="color: #ef4444; font-size: 14px; margin: 0 0 16px 0;">⚠️ Mã OTP có hiệu lực trong <strong>15 phút</strong>. Không chia sẻ mã này với bất kỳ ai.</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.</p>
      </div>
    </div>
  `;
  return sendEmail(email, `Mã OTP đặt lại mật khẩu - Quản Lý Khóa Học`, html);
};

/**
 * Gửi email xác thực tài khoản
 * @param {string} email - Email người nhận
 * @param {string} token - Verification token
 * @returns {Object} Info từ nodemailer
 */
const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email/${token}`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Xác thực tài khoản</h2>
      <p>Cảm ơn bạn đã đăng ký. Vui lòng click vào link bên dưới để xác thực email:</p>
      <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
        Xác thực tài khoản
      </a>
      <p>Hoặc copy link: <a href="${url}">${url}</a></p>
      <p>Link hết hạn sau 24 giờ.</p>
    </div>
  `;
  return sendEmail(email, 'Xác thực tài khoản - Quản Lý Khóa Học', html);
};

/**
 * Gửi email reset mật khẩu (link-based - backup method)
 * @param {string} email - Email người nhận
 * @param {string} token - Reset token
 * @returns {Object} Info từ nodemailer
 */
const sendResetPasswordEmail = async (email, token) => {
  const url = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${token}`;
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Đặt lại mật khẩu</h2>
      <p>Bạn đã yêu cầu đặt lại mật khẩu. Click link bên dưới để tiếp tục:</p>
      <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
        Đặt lại mật khẩu
      </a>
      <p>Hoặc copy link: <a href="${url}">${url}</a></p>
      <p>Link hết hạn sau 1 giờ. Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
    </div>
  `;
  return sendEmail(email, 'Đặt lại mật khẩu - Quản Lý Khóa Học', html);
};

module.exports = { 
  sendEmail, 
  sendVerificationEmail, 
  sendResetPasswordEmail,
  sendOtpEmail,
  generateOtp
};