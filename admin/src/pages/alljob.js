import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./alljob.css";

const BrowseJob = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/browseJob", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

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

  const handleDelete = async (job_id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/deletejobs/${job_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted job from the 
      
      setFilteredJobs((prevJobs) => prevJobs.filter((job) => job._id !== job_id));
      toast.success("Delete A Job Successfully")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="job-list">
      <h1 className="job-list__heading">Job List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="job-list__table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Posted By</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredJobs.map((job, index) => (
            <tr key={job._id}>
              <td>{job.jobTitle}</td>
              <td>
                <Link
                  to={`/employers/${job.employer}`}
                  onClick={() => navigate(`/employers/${job.employer}`)}
                >
                  {job.fullName}
                </Link>
              </td>
             
              <td>{job.jobLocation}</td>
              <td>{job.salary}</td>
              <td>
                {new Date(job.jobStartDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td>
                {new Date(job.jobEndDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td>
                <button
                  className="job-list__card-delete"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseJob;
