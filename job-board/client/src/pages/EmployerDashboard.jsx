// import React, { useState } from 'react';
// import './EmployerDashboard.css';

// export const EmployerDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [newJob, setNewJob] = useState({ title: '', company: '', location: '', type: '', description: '', requirements: '' });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewJob({ ...newJob, [name]: value });
//   };

//   const handlePostJob = () => {
//     setJobs([...jobs, { ...newJob, id: jobs.length + 1 }]);
//     setNewJob({ title: '', company: '', location: '', type: '', description: '', requirements: '' });
//   };

//   return (
//     <div className="employer-dashboard">
//       <h1>Employer Dashboard</h1>
//       <div className="account-management">
//         <h2>Account Management</h2>
//         {/* Add account management logic here */}
//       </div>
//       <div className="job-posting">
//         <h2>Post a Job</h2>
//         <input type="text" name="title" placeholder="Job Title" value={newJob.title} onChange={handleInputChange} />
//         <input type="text" name="company" placeholder="Company" value={newJob.company} onChange={handleInputChange} />
//         <input type="text" name="location" placeholder="Location" value={newJob.location} onChange={handleInputChange} />
//         <input type="text" name="type" placeholder="Job Type" value={newJob.type} onChange={handleInputChange} />
//         <textarea name="description" placeholder="Description" value={newJob.description} onChange={handleInputChange}></textarea>
//         <textarea name="requirements" placeholder="Requirements" value={newJob.requirements} onChange={handleInputChange}></textarea>
//         <button onClick={handlePostJob}>Post Job</button>
//       </div>
//       <div className="posted-jobs">
//         <h2>Posted Jobs</h2>
//         {jobs.map(job => (
//           <div key={job.id} className="job-card">
//             <h3>{job.title}</h3>
//             <p>{job.company}</p>
//             <p>{job.location}</p>
//             <p>{job.type}</p>
//             <p>{job.description}</p>
//             <p>{job.requirements}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import "./EmployerDashboard.css";

export const EmployerDashboard = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    requirements: "",
    responsibilities: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/jobs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Job posted successfully!");
        setJob({
          title: "",
          company: "",
          location: "",
          type: "",
          description: "",
          requirements: "",
          responsibilities: "",
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>
      <form onSubmit={handleSubmit} className="job-post-form">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Job Type"
          value={job.type}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          required
        ></textarea>
        <textarea
          name="requirements"
          placeholder="Job Requirements"
          value={job.requirements}
          onChange={handleChange}
          required
        ></textarea>
        <textarea
          name="responsibilities"
          placeholder="Job Responsibilities"
          value={job.responsibilities}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

// export default EmployerDashboard;
