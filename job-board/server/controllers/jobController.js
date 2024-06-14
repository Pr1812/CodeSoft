const nodemailer = require("nodemailer");
const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pratikshajani2003@gmail.com", // Replace with your email
    pass: "pratiksha", // Replace with your email password or app-specific password
  },
});

// Add a new job
exports.addJob = async (req, res) => {
  const { title, company, location, type, description, requirements, responsibilities } = req.body;

  try {
    const newJob = new Job({
      title,
      company,
      location,
      type,
      description,
      requirements,
      responsibilities
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Error adding job", error });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Handle job application
exports.applyForJob = async (req, res) => {
  const { jobId, candidateName, candidateEmail, coverLetter } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Save job application
    const newApplication = new JobApplication({
      jobId,
      candidateName,
      candidateEmail,
      coverLetter,
    });

    await newApplication.save();

    // Send an email notification to the candidate
    const mailOptions = {
      from: "pratikshajani2003@gmail.com", // Replace with your email
      to: candidateEmail,
      subject: "Job Application Received",
      text: `Dear ${candidateName},\n\nThank you for applying for the position of ${job.title} at ${job.company}.\n\nWe have received your application and will review it shortly.\n\nBest regards,\n${job.company}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      }
      res
        .status(200)
        .json({ message: "Job application submitted and email sent" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error applying for job", error });
  }
};

// Get all job applications for a candidate
exports.getCandidateApplications = async (req, res) => {
  const { candidateEmail } = req.query;

  try {
    const applications = await JobApplication.find({ candidateEmail }).populate(
      "jobId"
    );
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// Get a job by ID
exports.getJobById = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job', error });
  }
};

