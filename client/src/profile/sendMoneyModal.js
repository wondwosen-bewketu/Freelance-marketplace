import React, { useState } from "react";
import Modal from "react-modal";
import './createWallet.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendMoneyModal = ({ employerId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    window.location.reload();
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
    console.log(response2.data._id);
    try {
      const response = await axios.post(`http://localhost:4000/api/bank/send-funds/${response2.data._id}`, 
      { amount, accountNumber },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      console.log(response.data._id);
      toast("Send Money successfully");
      handleModalClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={handleModalOpen} id="send-money-btn">
        Send Money
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Send Money</h2>
          </div>
          <form className="modal-form" onSubmit={handleSubmit} >
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label htmlFor="accountNumber">Recipient Account Number:</label>
            <input type="text" id="accountNumber" name="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            <div className="modal-buttons">
              <button type="submit">Send</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SendMoneyModal;
