import React, { useState } from "react";
import Modal from "react-modal";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WithdrawModal = ({ freelancerId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amount, setAmount] = useState('');

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
      const response = await axios.post(
        `http://localhost:4000/api/bank/freelancer/${response2.data._id}/withdraw`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    toast.success("Wthdraw successfully");
      handleModalClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={handleModalOpen} id="withdraw-btn" >
        Withdraw
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
          <h2>Withdraw from Wallet</h2>
          </div>
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="modal-buttons">
              <button type="submit">Withdraw</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default WithdrawModal;
