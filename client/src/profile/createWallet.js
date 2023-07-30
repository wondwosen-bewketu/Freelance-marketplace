import React, { useState } from "react";
import Modal from "react-modal";
import "./createWallet.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateWalletModal = ({ employerId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [walletCreated, setWalletCreated] = useState(false);

  const handleModalOpen = () => {
    if (!walletCreated) {
      setModalIsOpen(true);
    } else {
      toast.error("Wallet has already been created.");
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const response2 = await axios.get(`http://localhost:4000/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    try {
      const response = await axios.post(
        `http://localhost:4000/api/bank/employer/${response2.data._id}`,
        { accountNumber },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setWalletCreated(true);
      toast.success("Wallet created for Employer successfully");

      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleModalOpen} id="create-wallet-btn" disabled={walletCreated}>
        Create Wallet
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create Wallet</h2>
          </div>
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="accountNumber">Account Number:</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <div className="modal-buttons">
              <button type="submit">Create Wallet</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default CreateWalletModal;
