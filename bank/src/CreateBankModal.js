import React, { useState } from "react";
import Modal from "react-modal";
import './CreateBankModal.css';
import axios from 'axios';

const CreateBankAccountModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:4000/api/createBankAccount`,
        { name, balance },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      window.alert("Bank account created successfully");
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleModalOpen} className="create-account-btn">
        Create Bank Account
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create Bank Account</h2>
          </div>
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="balance">Balance:</label>
            <input type="text" id="balance" name="balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
            <div className="modal-buttons">
              <button type="submit">Create</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateBankAccountModal;
