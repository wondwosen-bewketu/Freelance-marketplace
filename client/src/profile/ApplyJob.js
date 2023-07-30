import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './applyjob.css';

function ApplyJob() {
  const location = useLocation();
  const jobId = location.state.jobId;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  
  const [resume, setResume] = useState("");
  const [status, setStatus] = useState(""); // 'submitting', 'success', or 'error'


  
  useEffect(() => {
    // get user data from backend and populate form
    axios
      .get("http://localhost:4000/api/viewfreelancerprofile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setFormData({
          name: res.data.fullName,
          email: res.data.email,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


    const handleResumeChange = (e) => {
      const selectedFile = e.target.files[0];
  
      if (selectedFile) {
        // Check if the file type is allowed (image, pdf, or powerpoint)
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedTypes.includes(selectedFile.type)) {
          if (resume) {
            // Display a toast message if resume is already uploaded
            toast.warn('You have already uploaded a resume.');
            e.target.value = null; // Clear the file input
          } else {
            setResume(selectedFile);
          }
        } else {
          // Display a toast message for invalid file type
          toast.error('Invalid file type. Please upload an image or PDF file.');
          e.target.value = null; // Clear the file input
        }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        setStatus("submitting");
    
        const response = await axios.post(
          `http://localhost:4000/api/${jobId}/apply`,
          {
            name: formData.name,
            email: formData.email,
            resume,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        console.log(response.data);
        setFormData({
          name: "",
          email: "",
        });
        setResume(null);
    
        toast.success('Application submitted successfully!');
        setStatus("success");
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message);
        } else {
          toast.error('An error occurred while submitting the application.');
        }
        setStatus("error");
      }
    };
    
  return (
    <div>
      <header className='freelancerheader'>
        <div>
          <h1 className='freelancerlogo'>Freelance System</h1>
        </div>
      </header>
      <div className="job-form">
        <h1>Apply for Job</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
            required
          /> </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email"  value={formData.email} onChange={onChange} />
          </div>
         
          <div className="file-input">
            <label htmlFor="resume">Resume</label>
            <input type="file" id="resume" onChange={handleResumeChange}  required/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ApplyJob;
