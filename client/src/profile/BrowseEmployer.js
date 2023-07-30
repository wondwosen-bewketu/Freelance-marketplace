import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import './browseEmployer.css';

const BrowseEmployer = () => {
  const history = useHistory();
  const [employers, setEmployers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const employersPerPage = 8; // Number of employers/grid items per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/employers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployers();

        const interval = setInterval(() => {
        fetchEmployers();
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredEmployers(employers);
    } else {
      const filtered = employers.filter((employer) =>
        employer.fullName?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredEmployers(filtered);
    }
  };

  useEffect(() => {
    setFilteredEmployers(
      employers.filter((employer) =>
        employer.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, employers]);

  const indexOfLastEmployer = currentPage * employersPerPage;
  const indexOfFirstEmployer = indexOfLastEmployer - employersPerPage;
  const currentEmployers = filteredEmployers.slice(indexOfFirstEmployer, indexOfLastEmployer);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <header className='freelancerheader'>
        <div>
          <h1 className='freelancerlogo'>Freelance System</h1>
        </div>
      </header>
      <div className="browse-employer">
        <h1 className="browse-employer__heading"></h1>
        <div className="search-barr">
          <input
            type="text"
            placeholder="Search Employers by..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="browse-employer__grid">
          {currentEmployers.map((employer, index) => (
            <div className="browse-employer__card" key={employer._id}>
              <div className="browse-employer__card-heading">
                <h2 className="browse-employer__card-title">{employer.fullName}</h2>
                <Link
                  className="browse-employer__card-link"
                  to={`/employers/${employer._id}`}
                  onClick={() => history.push(`/employers/${employer._id}`)}
                >
                  View Profile
                </Link>
              </div>
              <ul className="browse-employer__card-details">
                <li>
                  <span>Username:</span> {employer.username}
                </li>
                <li>
                  <span>Email:</span> {employer.email}
                </li>
               
                <li>
                  <span>Company:</span> {employer.company}
                </li>
                <li>
                  <span>Website:</span> {employer.website}
                </li>
                <li>
                  <span>Phone Number:</span> {employer.phone}
                </li>
                <li>
                  <span>Country:</span> {employer.country}
                </li>
                <li>
                  <span>City:</span> {employer.city}
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="pagination">
          <ul className="pagination__list">
            {Array.from({ length: Math.ceil(filteredEmployers.length / employersPerPage) }, (_, index) => (
              <li
                key={index + 1}
                className={`pagination__item ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BrowseEmployer;
