import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './JobDetailPage.css';

export const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await response.json();
        if (response.ok) {
          setJob(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-detail">
      <h1>{job.title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <h2>Description</h2>
      <p>{job.description}</p>
      <h2>Requirements</h2>
      <p>{job.requirements}</p>
      <h2>Responsibilities</h2>
      <p>{job.responsibilities}</p>
      <NavLink to="/jobList" className="back-button">Back to Listings</NavLink>
    </div>
  );
};

// export default JobDetailPage;
