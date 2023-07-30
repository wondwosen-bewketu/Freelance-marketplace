import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import moment from 'moment';

import "./browsealljob.css";



const BrowseJob = () => {
  const history = useHistory();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5); // Number of jobs to display per page
  const [sortedJobs, setSortedJobs] = useState([]);
  const [sortMode, setSortMode] = useState("skills"); // Default sort mode is "skills"


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/api/browseJob",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reversedJobs = response.data.reverse(); // Reverse the array to display new posts first
        setJobs(reversedJobs);
        setFilteredJobs(reversedJobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
   const interval = setInterval(() => {
        fetchJobs();
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount

  }, []);

  const sortJobsBySkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const response2 = await axios.get(`http://localhost:4000/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      console.log(response2);
  
      const freelancerSkills = response2.data.skills[0];
  
      if (sortMode === "skills") {
        // Filter jobs based on freelancer skills
        const filteredJobs = jobs.filter((job) => {
          return freelancerSkills.includes(job.jobCategory || job.translation || job.graphics);
        });
  
        // Sort filtered jobs alphabetically by job title
        const sortedJobs = filteredJobs.sort((a, b) =>
          a.jobTitle.localeCompare(b.jobTitle)
        );
  
        setSortedJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
        setCurrentPage(1); // Reset to the first page when sorting
        setSortMode("all"); // Update sort mode to "all"
      } else {
        // Display all jobs
        setSortedJobs([]);
        setFilteredJobs(jobs);
        setCurrentPage(1); // Reset to the first page
        setSortMode("skills"); // Update sort mode to "skills"cd client
      }
    } catch (error) {
      console.error(error);
    }
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
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.length > 0 ? sortedJobs.slice(indexOfFirstJob, indexOfLastJob) : filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page when changing pages
  };

  return (
    <div>
      <header className="freelancerheader">
        <div>
          <h1 className="freelancerlogo">Freelance System</h1>
        </div>
      </header>
      <div className="job-list">
        <h1 className="job-list__heading"></h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs by title..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button onClick={sortJobsBySkills} className="toggle">
  {sortMode === "skills" ? "Sort by Skills" : "All Jobs"}
</button>

        <div className="job-list__grid">
          {currentJobs.map((job, index) => (
            <div className="job-list__card" key={job._id}>
              <div className="job-list__card-heading">
                <h2 className="job-list__card-title">{job.jobTitle}</h2>
          
                {new Date(job.jobEndDate) < new Date() ? (
                  <span className="job-list__card-expired">Expired</span>
                ) : (
                  <>
                    
                    <Link
                      className={`job-list__card-link ${
                        new Date(job.jobEndDate) < new Date()
                          ? "job-list__card-link--expired"
                          : ""
                      }`}
                      to={{
                        pathname: `/apply_job/${job._id}`,
                        state: { jobId: job._id },
                      }}
                    >
                      Apply Now
                    </Link>
                  </>
                )}
              </div>
              <ul className="job-list__card-details">
                <li>
                  <span>Posted By:</span>
                  
                    {job.fullName}
                 
                </li>
                <li>
                <span className="job-list__card-posted-at">
  Posted at: {moment(job.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
</span>
</li>
                <li>
                  <span>Description :</span>  {job.jobDescription}
                </li>
                <li>
                  <span>Job Category:</span> {job.jobCategory || job.translation || job.graphics}
                </li>
                <li>
                  <span>Job Type:</span> {job.jobType}
                </li>
                <li>
                  <span>Job Level:</span> {job.jobLevel}
                </li>
                <li>
                  <span>Location:</span> {job.jobLocation}
                </li>
                <li>
                  <span>Salary:</span> {job.salary}
                </li>
                <li>
                  <span>Job Start Date:</span>{" "}
                  {new Date(job.jobStartDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
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
            </div>
          ))}
        </div>
        <div className="pagination">
          <ul className="pagination__list">
            {Array(Math.ceil(filteredJobs.length / jobsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`pagination__item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="pagination__button"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BrowseJob;
