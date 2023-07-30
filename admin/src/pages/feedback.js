import React, { useState, useEffect } from 'react';
import '../pages/feedback.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await fetch('http://localhost:4000/api/feedbacks');
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFeedbacks();
  }, []);

  const handleDelete = async (feedback_id) => {
    try {
      await fetch(`http://localhost:4000/api/feedbacks/${feedback_id}`, {
        method: 'DELETE',
      });
      // Remove the deleted feedback from the list
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback._id !== feedback_id)
      );
      toast.success("Delete Feedback Successfully")
    } catch (error) {
      console.error(error);
    }
  };

  const handleContactApplicant = (email) => {
    const emailSubject = 'Regarding Feedback';
    const emailBody = 'Dear Customer, your Feedback is View by Admin';
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
    <div className="feedback-list">
      <h1 className="feedback-heading">Feedbacks</h1>
      {feedbacks.map((feedback) => (
        <div className="feedback-item" key={feedback._id}>
          <div className="feedback-content-wrapper">
            <h2 className="feedback-title">{feedback.fullName}</h2>
          <h2 className="feedback-title-email" onClick={() => handleContactApplicant(feedback.email)}>  From: {feedback.email}</h2>
            <p className="feedback-content">{feedback.message}  <button
            className="feedback-delete-button"
            onClick={() => handleDelete(feedback._id)}
          >
            Delete
          </button></p>
          </div>
         
        </div>
      ))}
    </div>
  );
  
}

export default FeedbackList;
