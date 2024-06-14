const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Route to add a new job
router.post('/add', jobController.addJob);

// Route to get all jobs
router.get('/list', jobController.getJobs);

// Route to apply for a job
router.post('/apply', jobController.applyForJob);

// Route to get all job applications for a candidate
router.get('/applications', jobController.getCandidateApplications);

// Route to get a job by ID
router.get('/:jobId', jobController.getJobById);

module.exports = router;
