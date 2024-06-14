import React, { useState, useEffect } from 'react';
import './CandidateDashboard.css';

export const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const candidateEmail = 'candidate_email@example.com'; // Replace with the logged-in candidate's email

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/applications?candidateEmail=${candidateEmail}`);
        const data = await response.json();
        if (response.ok) {
          setApplications(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchApplications();
  }, [candidateEmail]);

  return (
    <div className="candidate-dashboard">
      <h1>Candidate Dashboard</h1>
      <h2>My Job Applications</h2>
      <div className="applications">
        {applications.map(application => (
          <div key={application._id} className="application">
            <h3>{application.jobId.title}</h3>
            <p><strong>Company:</strong> {application.jobId.company}</p>
            <p><strong>Location:</strong> {application.jobId.location}</p>
            <p><strong>Type:</strong> {application.jobId.type}</p>
            <p><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleDateString()}</p>
            <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default CandidateDashboard;
