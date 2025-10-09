// ============================================================================
// ENROLLMENT CONTROLLER
// ============================================================================
// Handles course enrollment form submissions and email notifications

const { sendEnrollmentApplicationEmail, sendEnrollmentConfirmationEmail } = require('../config/email');

/**
 * Process course enrollment form submission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const processEnrollment = async (req, res) => {
  try {
    console.log('📝 Processing course enrollment application');
    
    const { name, email, phone, age, education, course } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !age || !education || !course) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    
    
    // Validate phone number (basic validation)
    if (phone.length < 10 || phone.length > 15) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }
    
    const enrollmentData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      age: age,
      education: education.trim(),
      course: course.trim()
    };
    
    console.log('📧 Sending enrollment emails...');
    
    // Send emails concurrently with better error handling
    try {
      await Promise.all([
        sendEnrollmentApplicationEmail(enrollmentData),
        sendEnrollmentConfirmationEmail(enrollmentData)
      ]);
      
      console.log('✅ Enrollment emails sent successfully');
      console.log(`📋 New enrollment: ${name} applied for ${course}`);
      
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      
      // Even if email fails, we should still respond with success for the enrollment
      // but indicate the email issue
      return res.status(200).json({
        success: true,
        message: 'Enrollment application submitted successfully! However, there was an issue sending confirmation emails. Our team will contact you directly.',
        data: {
          name: enrollmentData.name,
          course: enrollmentData.course,
          email: enrollmentData.email
        },
        warning: 'Email notification issue - team will contact you directly'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Enrollment application submitted successfully! Check your email for confirmation.',
      data: {
        name: enrollmentData.name,
        course: enrollmentData.course,
        email: enrollmentData.email
      }
    });
    
  } catch (error) {
    console.error('❌ Enrollment processing error:', error);
    
    // Return a more specific error response
    res.status(500).json({
      success: false,
      message: 'Failed to process enrollment application. Please try again or contact support.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};


module.exports = {
  processEnrollment,
};