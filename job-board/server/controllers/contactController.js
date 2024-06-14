const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pratikshajani2003@gmail.com', // Replace with your email
    pass: 'pratiksha', // Replace with your email password or app-specific password
  },
});

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
  const { username, email, message } = req.body;

  try {
    // Save the contact form submission
    const newContact = new Contact({ username, email, message });
    await newContact.save();

    // Send an email notification to the user
    const mailOptions = {
      from: 'pratikshajani2003@gmail.com', // Replace with your email
      to: email,
      subject: 'Contact Form Submission Received',
      text: `Dear ${username},\n\nThank you for reaching out to us. We have received your message:\n\n${message}\n\nWe will get back to you shortly.\n\nBest regards,\nYour Company`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email', error });
      }
      res.status(200).json({ message: 'Contact form submitted and email sent' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form', error });
  }
};
