import React, { useState } from "react";
import Modal from "react-modal";
import './DepositToBankModel.css';
import axios from 'axios';

const DepositToBankModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
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

    try {
      const response = await axios.post(
        `http://localhost:4000/api/bank/deposit`,
        { accountNumber, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      window.alert("Deposit successful");
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleModalOpen} className="deposit-to-bank-btn">
        Deposit to Bank
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Deposit to Bank</h2>
          </div>
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="accountNumber">Account Number:</label>
            <input type="text" id="accountNumber" name="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="modal-buttons">
              <button type="submit">Deposit</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default DepositToBankModal;
