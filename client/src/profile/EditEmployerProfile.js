import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import './EditEmployerProfile.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement("#root");

const EditEmployerProfile = () => {
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    company:"",
    website:"",
    country: "",
    city: "",
  });

  const { name, email, username,  company,website,country, city } =
    formData;

  useEffect(() => {
    // get user data from backend and populate form
    axios
      .get("http://localhost:4000/api/viewpemployerrofile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setFormData({
          name: res.data.fullName,
          username: res.data.username,
          email: res.data.email,
          company: res.data.company,
          website: res.data.website,
        
          country: res.data.country,
          city: res.data.city,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
   
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      fullName: name,
      username: username,
      email: email,
      company: company,
      website: website,
      country: country,
      city: city,
      
    };
     window.location.reload();

    axios
      .put("http://localhost:4000/api/editemployerprofile", updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err.response.data));

    setFormData({
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      company: "",
      website: "",
      country: "",
      city: "",
    });

   toast.success("Profile Updated Successfully");
   closeModal();
  };

  return (
    <React.Fragment>
      <div>
      <button onClick={openModal} className="btn btn-primary">Edit Profile</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
        >
  <div className="edit-profile-container">
    <form className="form" onSubmit={onSubmit}>
    <button onClick={handleModalClose}>X</button>
      <h1 className="large text-primary">Edit Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Update Your Profile Information
      </p>
      <div className="edit-profile-wrapper">
        <div className="edit-profile-grid left-side">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-groupp">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="company"
              name="company"
              value={formData.company}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="edit-profile-grid right-side">
          <div className="form-group">
            <input
              type="text"
              placeholder="website"
              name="website"
              value={formData.website}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
         
          <div className="form-group">
            <input
              type="text"
              placeholder="country"
              name="country"
              value={formData.country}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="city"
              name="city"
              value={formData.city}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-groupp">
            <input type="submit" className="btn btn-primary" value="update" />
          </div>
        </div>
     
      </div>
    </form>
    
  </div>
  </Modal>
  </div>
</React.Fragment>
  );
};

export default EditEmployerProfile;