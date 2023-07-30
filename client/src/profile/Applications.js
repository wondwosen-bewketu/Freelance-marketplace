import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './application.css';

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const location = useLocation();
  const jobId = location.state.jobId;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/application/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setApplications(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplications();

    //    const interval = setInterval(() => {
    //     fetchApplications();
    // }, 1000);

    // return () => clearInterval(interval); // Cleanup the interval on component unmount

  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:4000/api/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const filteredApplications = applications.filter((application) => application._id !== id);
        setApplications(filteredApplications);
        toast.error('Application deleted successfully!');
      })
      .catch((err) => console.log(err));
  };

  const handleContactApplicant = (email) => {
    const emailSubject = 'Regarding Job Application';
    const emailBody = 'Dear Applicant, your application is accepted';
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoLink = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodedSubject}&body=${encodedBody}`;
    const emailWindow= window.open(mailtoLink, '_blank');

    
    // Check if the email window is opened
    if (emailWindow) {
      // Display a success toast message
      toast.success('Email sent successfully!');
    } else {
      // Display an error toast message if the email window fails to open
      toast.error('Failed to open email window!');
    }

  };

  return (
    <div>
      <header className="freelancerheader">
        <div>
          <h1 className="freelancerlogo">Freelance System</h1>
        </div>
      </header>
      <div className="applications-container">
        <h1 className="applications-heading">Applications</h1>
        {applications.length === 0 ? (
          <p className="no-applications">No applications submitted yet.</p>
        ) : (
          <div className="applications-list">
            {applications.map((application) => (
              <div className="application-item" key={application._id}>
                <div className="application-details">
                  <div className="application-details__row">
                    <span className="application-details__label">Name:</span>
                    <span className="application-details__value">{application.name}</span>
                  </div>
                  <div className="application-details__row">
                    <span className="application-details__label">Email:</span>
                    <span className="application-details__value">{application.email}</span>
                  </div>
                  <div className="application-details__row">
                    <span className="application-details__label">Resume:</span>
                    <div className="application-details__value">
                      <a className="resume-link" href={`http://localhost:4000/${application.resume}`} target="_blank" rel="noopener noreferrer">
                        Open Resume
                      </a>
                    </div>
                  </div>
                </div>
                <div className="application-actions">
                  <button className="application-action__buttonn" onClick={() => handleRemove(application._id)}>
                    Remove
                  </button>
                  <button
                    className="application-action__button"
                    onClick={() => handleContactApplicant(application.email)}
                  >
                    Contact Applicant
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationList;
