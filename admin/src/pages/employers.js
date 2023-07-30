import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './employers.css';

const BrowseEmployer = () => {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployers, setFilteredEmployers] = useState([]);

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
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
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

  const handleDelete = async (employer_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/employers/delete/${employer_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted employer from the list
      setFilteredEmployers((prevEmployers) =>
        prevEmployers.filter((employer) => employer._id !== employer_id)
      );
      toast.success("Delete Employer Successfully")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="browse-employer">
      <h1 className="browse-employer__heading">Employer List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Employers by..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="browse-employer__table">
        <thead>
          <tr>
           
            <th>Full Name</th>
            <th>Email</th>
       
            <th>Company</th>
            <th>Website</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployers.map((employer) => (
            <tr key={employer._id}>
              <td>{employer.fullName}</td>
              <td>{employer.email}</td>
              <td>{employer.company}</td>
              <td>{employer.website}</td>
              <td>{employer.phone}</td>
              <td>{employer.country}</td>
              <td>{employer.city}</td>
              <td>
                
                <button
                  className="browse-employer__card-delete"
                  onClick={() => handleDelete(employer._id)}
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

export default BrowseEmployer;
