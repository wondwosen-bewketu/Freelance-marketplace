import React, { useState } from "react";
import Modal from "react-modal";
import './createWallet.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateWalletModal = ({ employerId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      const response = await axios.post(`http://localhost:4000/api/bank/freelancer/${response2.data._id}`, 
      { accountNumber },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      console.log(response.data);
      toast.success("Wallet Created for Freelancer successfully", {
        position: toast.POSITION.TOP_RIGHT,
        className: 'toast-success',
      });
      
      handleModalClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={handleModalOpen} className="create-wallet-btn">
      Create <span>&#x1F4B3;</span>
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create Wallet</h2>
          </div>
          <form className="modal-form" onSubmit={handleSubmit} >
            <label htmlFor="accountNumber">Account Number:</label>
            <input type="text" id="accountNumber" name="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            <div className="modal-buttons">
              <button type="submit">Create Wallet</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateWalletModal;
