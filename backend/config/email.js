// ============================================================================
// EMAIL CONFIGURATION
// ============================================================================
// Nodemailer setup for sending enrollment and notification emails

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

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
  
  // Debug: Check if file exists
  const logoPath = path.join(__dirname, '..', 'assets', 'only-logo-black-border-yellow-bg.svg');
  console.log('Logo path:', logoPath);
  console.log('File exists:', fs.existsSync(logoPath));
  
  await transporter.sendMail({
    attachments: [
      {
        filename: 'tutelage-logo.svg',
        path: logoPath,
        cid: 'tutelage-logo',
        contentDisposition: 'inline'
      }
    ],
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to admin email
    subject: `New Course Enrollment Application: ${course}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header with Tutelage branding -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fec016 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
           <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <h1 style=" color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                 TUTELAGE
              </h1>
            </div>
              <p style=" color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
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
  
  const logoPath = path.join(__dirname, '..', 'assets', 'only-logo-black-border-yellow-bg.svg');
  
  await transporter.sendMail({
    attachments: [
      {
        filename: 'tutelage-logo.svg',
        path: logoPath,
        cid: 'tutelage-logo',
        contentDisposition: 'inline'
      }
    ],
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Enrollment Application Received - Welcome to Tutelage!',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header with Tutelage branding -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fec016 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
           <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <h1 style=" color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                 TUTELAGE
              </h1>
            </div>
              <p style=" color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
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

/**
 * Send pricing information email to the student for English for Kids and Teens
 * @param {Object} pricingData - The pricing request data
 */
async function sendPricingRequestEmail(pricingData) {
  const { firstName, lastName, email, course } = pricingData;
  
  const logoPath = path.join(__dirname, '..', 'assets', 'only-logo-black-border-yellow-bg.svg');
  
  await transporter.sendMail({
    attachments: [
      {
        filename: 'tutelage-logo.svg',
        path: logoPath,
        cid: 'tutelage-logo',
        contentDisposition: 'inline'
      }
    ],
    from: process.env.EMAIL_USER,
    to: email,
    subject: `${course} - Course Information & Pricing`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header with Tutelage branding -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fec016 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <div style="display: flex; align-items: center; justify-center; gap: 12px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              TUTELAGE
            </h1>
          </div>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            English Learning Platform
          </p>
        </div>
        
        <!-- Main content -->
        <div style="padding: 30px 20px; background-color: #ffffff;">
          <h2 style="color: #111111; border-bottom: 3px solid #f59e0b; padding-bottom: 15px; margin-bottom: 25px; font-size: 24px;">
            ${course} - Course Information
          </h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear <strong>${firstName} ${lastName}</strong>,</p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Thank you for your interest in our <strong style="color: #f59e0b;">${course}</strong> program! 
            We're excited to share detailed information about our course options.
          </p>

          <!-- Public Classes Section -->
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #f59e0b; margin-top: 0; font-size: 20px; margin-bottom: 15px;">📚 Public Classes</h3>
            <ul style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>Live Online classes</strong></li>
              <li>For ages <strong>5-17</strong></li>
              <li>Small groups (<strong>3-5 learners only</strong>)</li>
              <li>Practice with AI companion</li>
              <li>Fun games and interactive lessons backed by Tutelage Method</li>
              <li>Age-specific for top results</li>
              <li>Certificate of completion</li>
              <li><strong>32 lessons per course</strong></li>
            </ul>
            <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-radius: 6px;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                💰 <strong>Pricing:</strong> Contact us for current rates and available discounts
              </p>
            </div>
          </div>

          <!-- Private Classes Section -->
          <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #f59e0b; margin-top: 0; font-size: 20px; margin-bottom: 15px;">👤 Private Classes</h3>
            <ul style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li><strong>Live Online classes</strong></li>
              <li>For ages <strong>5-17</strong></li>
              <li>One-on-one lessons (<strong>1 learner only</strong>)</li>
              <li>Designed course for each learner</li>
              <li>Practice with AI companion</li>
              <li>Fun games and interactive lessons backed by Tutelage Method</li>
              <li>Certificate of completion</li>
              <li>Flexibility in time and schedule</li>
              <li><strong>16 lessons</strong></li>
            </ul>
            <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border-radius: 6px;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                💰 <strong>Pricing:</strong> Contact us for personalized pricing based on your schedule
              </p>
            </div>
          </div>

          <!-- Why Choose Tutelage -->
          <div style="background-color: #e0f2fe; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #0369a1; margin-top: 0; font-size: 18px;">
              🌟 Why Choose Tutelage?
            </h3>
            <ul style="color: #0369a1; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Expert native English instructors</li>
              <li>Proven Tutelage Method for effective learning</li>
              <li>Small class sizes for personalized attention</li>
              <li>AI companion for extra practice</li>
              <li>Certificate of completion</li>
              <li>Flexible scheduling options</li>
            </ul>
          </div>

          <!-- Next Steps -->
          <div style="background-color: #dcfce7; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #166534; margin-top: 0; font-size: 16px;">
              📞 Ready to Get Started?
            </h3>
            <p style="color: #166534; margin: 0; line-height: 1.6; font-size: 14px;">
              <strong>Contact our enrollment team:</strong><br>
              📧 Email: Info@tutelage.krd<br>
              📱 Phone: (964+) 07501534240 or (964+) 07701946364<br>
              <br>
              Our team will be happy to discuss pricing details, payment plans, and help you choose the best option for your child!
            </p>
          </div>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            We look forward to helping your child master English in a fun and engaging way!
          </p>

          <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
            <p style="color: #333; margin: 0; font-size: 16px;">
              <strong>Have questions?</strong>
            </p>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
              Reply to this email or contact us directly for personalized assistance!
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
  sendEnrollmentConfirmationEmail,
  sendPricingRequestEmail
};