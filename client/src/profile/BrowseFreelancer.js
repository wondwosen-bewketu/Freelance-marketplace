import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import Message from "./message"; // Import the Message component
import "./browseEmployer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

const BrowseFreelancer = () => {
  const history = useHistory();
  const location = useLocation();
  const [freelancers, setFreelancers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const freelancersPerPage = 8; // Number of freelancers/grid items per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/api/freelancers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFreelancers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFreelancers();
    const interval = setInterval(() => {
        fetchFreelancers();
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount

  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredFreelancers(freelancers);
    } else {
      const filtered = freelancers.filter((freelancer) =>
        freelancer.fullName
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setFilteredFreelancers(filtered);
    }
  };

  useEffect(() => {
    setFilteredFreelancers(
      freelancers.filter((freelancer) =>
        freelancer.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, freelancers]);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = filteredFreelancers.slice(
    indexOfFirstFreelancer,
    indexOfLastFreelancer
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <header className="freelancerheader">
        <div>
          <h1 className="freelancerlogo">Freelance System</h1>
        </div>
      </header>
      <div className="browse-employer">
     
        <div className="search-barr">
          <input
            type="text"
            placeholder="Search Freelancers by..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="browse-employer__grid">
          {currentFreelancers.map((freelancer, index) => (
            <div className="browse-employer__card" key={freelancer._id}>
              <div className="browse-employer__card-heading">
                <h2 className="browse-employer__card-title">
                  {freelancer.fullName}
                </h2>
                <Link
                  className="browse-employer__card-link-message"
                  onClick={() => handleOpenModal()}
                  to={{
                    pathname: `/message/${freelancer._id}`,
                    state: { freelancerId: freelancer._id },
                  }}
                >
                  <FontAwesomeIcon icon={faTelegram}/>
                </Link>
                <Link
                  className="browse-employer__card-link"
                  to={{
                    pathname: `/freelancers/${freelancer._id}`,
                  }}
                  onClick={() =>
                    history.push(`/freelancers/${freelancer._id}`)
                  }
                >
                  View Profile
                </Link>
              </div>

              <ul className="browse-employer__card-details">
             
                <li>
                  <span>Username:</span> {freelancer.username}
                </li>
                <li>
                  <span>Email:</span> {freelancer.email}
                </li>
                
                <li>
                  <span>Professional Title:</span>{" "}
                  {freelancer.professionalTitle}
                </li>
                <li>
                  <span>Skills:</span> {freelancer.skills}
                </li>

                <li>
                  <span>Experience:</span> {freelancer.experience}
                </li>
                <li></li>
                <li>
                  <span>Phone Number:</span> {freelancer.phone}
                </li>
                <li>
                  <span>Country:</span> {freelancer.country}
                </li>
                <li>
                  <span>City:</span> {freelancer.city}
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="pagination">
          <ul className="pagination__list">
            {Array.from(
              { length: Math.ceil(filteredFreelancers.length / freelancersPerPage) },
              (_, index) => (
                <li
                  key={index + 1}
                  className={`pagination__item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              )
            )}
          </ul>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          className="modal-container"
        >
          <Message />
        </Modal>
      </div>
    </div>
  );
};

export default BrowseFreelancer;
