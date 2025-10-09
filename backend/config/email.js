// ============================================================================
// EMAIL CONFIGURATION
// ============================================================================
// Nodemailer setup for sending enrollment and notification emails

const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test the connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

/**
 * Send enrollment application email to admin
 * @param {Object} enrollmentData - The enrollment form data
 */
async function sendEnrollmentApplicationEmail(enrollmentData) {
  const {
    name,
    email,
    phone,
    age,
    education,
    course
  } = enrollmentData;
  
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to admin email
    subject: `New Course Enrollment Application: ${course}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header with Tutelage branding -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fec016 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            TUTELAGE
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            English Learning Platform
          </p>
        </div>
        
        <!-- Main content -->
        <div style="padding: 30px 20px; background-color: #ffffff;">
          <h2 style="color: #111111; border-bottom: 3px solid #f59e0b; padding-bottom: 15px; margin-bottom: 25px; font-size: 24px;">
            New Course Enrollment Application
          </h2>
          
          <!-- Application details -->
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #f59e0b; margin-top: 0; font-size: 18px;">Application Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 140px;">Date Submitted:</td>
                <td style="padding: 8px 0; color: #666;">${currentDate} at ${currentTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Student Name:</td>
                <td style="padding: 8px 0; color: #666;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #666;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #666;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Age:</td>
                <td style="padding: 8px 0; color: #666;">${age} years</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Education Level:</td>
                <td style="padding: 8px 0; color: #666;">${education}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Course Applied:</td>
                <td style="padding: 8px 0; color: #f59e0b; font-weight: bold;">${course}</td>
              </tr>
            </table>
          </div>
          
          <!-- Action required section -->
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-top: 30px;">
            <h3 style="color: #856404; margin-top: 0; font-size: 16px;">
              📋 Action Required
            </h3>
            <p style="color: #856404; margin-bottom: 0; line-height: 1.5;">
              Please review this enrollment application and contact the student to discuss their learning goals, schedule availability, and proceed with the enrollment process.
            </p>
          </div>
          
          <!-- Contact info -->
          <div style="margin-top: 25px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Quick Contact:</strong> You can reply directly to this email to reach ${name} at ${email}
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #111111; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #ffffff; margin: 0; font-size: 14px;">
            <strong>Tutelage English Learning Platform</strong>
          </p>
          <p style="color: #a1a1aa; margin: 5px 0 0 0; font-size: 12px;">
            Empowering students to achieve English fluency
          </p>
        </div>
      </div>
    `,
    replyTo: email, // Allow direct reply to the applicant
  });
}

/**
 * Send enrollment confirmation email to the student
 * @param {Object} enrollmentData - The enrollment form data
 */
async function sendEnrollmentConfirmationEmail(enrollmentData) {
  const { name, email, course } = enrollmentData;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Enrollment Application Received - Welcome to Tutelage!',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header with Tutelage branding -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fec016 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            TUTELAGE
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            English Learning Platform
          </p>
        </div>
        
        <!-- Main content -->
        <div style="padding: 30px 20px; background-color: #ffffff;">
          <h2 style="color: #111111; border-bottom: 3px solid #f59e0b; padding-bottom: 15px; margin-bottom: 25px; font-size: 24px;">
            Thank You for Your Application!
          </h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Thank you for applying to enroll in <strong style="color: #f59e0b;">${course}</strong> at Tutelage! 
            We're excited about the opportunity to help you achieve your English learning goals.
          </p>
          
          <!-- What happens next -->
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #f59e0b; margin-top: 0; font-size: 18px;">📚 What Happens Next?</h3>
            <ol style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>Application Review:</strong> Our team will review your application within 24-48 hours</li>
              <li><strong>Contact & Assessment:</strong> We'll contact you via phone or email to discuss your learning goals and assess your current level</li>
              <li><strong>Course Scheduling:</strong> Once approved, we'll help you choose the best schedule that fits your availability</li>
              <li><strong>Welcome Package:</strong> You'll receive course materials and access to our learning platform</li>
            </ol>
          </div>
          
          <!-- Course benefits -->
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #856404; margin-top: 0; font-size: 16px;">
              🌟 Why You Chose Tutelage
            </h3>
            <ul style="color: #856404; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Expert native English instructors</li>
              <li>Personalized learning approach</li>
              <li>Small class sizes for maximum attention</li>
              <li>Flexible scheduling options</li>
              <li>Interactive and engaging curriculum</li>
            </ul>
          </div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            If you have any questions while we process your application, please don't hesitate to reply to this email or contact us directly.
          </p>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
            <p style="color: #333; margin: 0; font-size: 16px;">
              <strong>Ready to start your English journey?</strong>
            </p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              We look forward to welcoming you to the Tutelage family!
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #111111; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #ffffff; margin: 0; font-size: 14px;">
            <strong>Tutelage English Learning Platform</strong>
          </p>
          <p style="color: #a1a1aa; margin: 5px 0 0 0; font-size: 12px;">
            Empowering students to achieve English fluency
          </p>
        </div>
      </div>
    `,
  });
}

module.exports = {
  transporter,
  sendEnrollmentApplicationEmail,
  sendEnrollmentConfirmationEmail
};