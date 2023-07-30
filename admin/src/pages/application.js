import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/application.css';

const AllApplicants = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/applications', {
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
  }, []);

  const handleDelete = async (application_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/applications/${application_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted application from the list
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== application_id)
        
      );
      toast.success("Delete An Application Successfully")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="applications-container">
      <h1 className="applications-heading">Applications</h1>
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
                <span className="application-details__label">Phone:</span>
                <span className="application-details__value">{application.phone}</span>
              </div>
              <div className="application-details__row">
                <span className="application-details__label">Education:</span>
                <span className="application-details__value">{application.education}</span>
              </div>
              <div className="application-details__row">
                <span className="application-details__label">Experience:</span>
                <span className="application-details__value">{application.experience}</span>
              </div>
            </div>
            <button
              className="application-delete-button"
              onClick={() => handleDelete(application._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApplicants;
