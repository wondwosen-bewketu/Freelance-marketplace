import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './employers.css';

const BrowseFreelancer = () => {
  const navigate = useNavigate();
  const [freelancers, setFreelancers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/freelancers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFreelancers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFreelancers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredFreelancers(freelancers);
    } else {
      const filtered = freelancers.filter((freelancer) =>
        freelancer.fullName?.toLowerCase().includes(e.target.value.toLowerCase())
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

  const handleDelete = async (freelancer_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/freelancers/delete/${freelancer_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted freelancer from the list
      setFilteredFreelancers((prevFreelancers) =>
        prevFreelancers.filter((freelancer) => freelancer._id !== freelancer_id)
      );
      toast.success("Delete Feedback Successfully")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="browse-employer">
      <h1 className="browse-employer__heading">Freelancers List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Freelancers by..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="browse-employer__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Professional Title</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFreelancers.map((freelancer, index) => (
            <tr key={freelancer._id}>
              <td>{freelancer.fullName}</td>
              <td>{freelancer.email}</td>
              <td>{freelancer.professionalTitle}</td>
              <td>{freelancer.skills}</td>
              <td>{freelancer.experience}</td>
              <td>{freelancer.phone}</td>
              <td>
                <button
                  className="browse-employer__card-delete"
                  onClick={() => handleDelete(freelancer._id)}
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

export default BrowseFreelancer;
