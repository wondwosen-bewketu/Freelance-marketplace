import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const BrowseJob = ({ employerId }) => {
 
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      const response2 = await axios.get(
        `http://localhost:4000/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      console.log("response2");
      console.log(response2);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/browseJob/${response2.data._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response");
        console.log(response);
        setJobs(response.data);
        setFilteredJobs(response.data); // Set filteredJobs to all jobs initially
      
      } catch (error) {
        console.error(error);
      }
      
    };

    fetchJobs();

   const interval = setInterval(() => {
        fetchJobs();
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
    
  }, [employerId]);

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:4000/api/deletejobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const filteredJobs = jobs.filter(
          (job) => job._id !== id
        );
        setJobs(filteredJobs); // update the state with the filtered array
      })
      .catch((err) => console.log(err));
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        job.jobTitle?.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setFilteredJobs(filtered);
    }
  };


  return (
    <div>
       <header className='freelancerheader'>
    <div>
      <h1 className='freelancerlogo'>Freelance System</h1>
    </div>
    </header>
   
    <div class="container job-list">
      <h1 class="mt-4 mb-4 text-center"></h1>
      
      <div class="row">
      {jobs &&
  filteredJobs.map((job, index) => (
    <div key={job._id} class="col-md-4 mb-4">
      <div class="card h-100 job-list__card">
       
        <Link
          to={{
            pathname: `/applicants/${job._id}`,
            state: { jobId: job._id },
          }}
          class="btn btn-primary job-list__card-link"
        >
          View Applicants
          
        </Link>
        <span class="job-list__card-date_expired">
        {new Date(job.jobEndDate) < new Date() && (
          <div class="job-list__expired">Expired</div>
        )}
        </span>

        <div class="card-body">
          <h5 class="card-title job-list__card-title">
          <span>Title:</span>{job.jobTitle}
          </h5>
          
          <div class="job-list__card-details">
            <ul class="list-unstyled mb-0">
              <li>
                {job.jobCategory}
               
              </li>
              <li>
              {job.jobLevel}
              </li>
              <li>
                <span>Job Start Date:</span>{" "}
                {new Date(job.jobStartDate).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </li>
              <li>
                <span>Job Deadline:</span>{" "}
                {new Date(job.jobEndDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </li>
            </ul>
            <div class="application-actions">
              <button
                class="application-action__buttonn"
                onClick={() => handleRemove(job._id)}
              >
                Remove
              </button>
              
             
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}

      </div>
      </div>
    </div>
  );
};

export default BrowseJob;
