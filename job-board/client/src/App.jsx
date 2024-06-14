import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Contact} from "./pages/Contact";
import {Service} from "./pages/Service";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {JobListingsPage} from "./pages/JobListingsPage";
import {JobDetailPage} from "./pages/JobDetailPage";
import {EmployerDashboard} from "./pages/EmployerDashboard";
import {CandidateDashboard} from "./pages/CandidateDashboard";
import {Error} from "./pages/Error";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobList" element={<JobListingsPage />} />
        <Route path="/job/:jobId" element={<JobDetailPage />} />
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
