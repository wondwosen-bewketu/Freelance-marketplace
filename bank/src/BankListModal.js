import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './BankListModal.css'; // Import the CSS file for styling

const BankListModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    async function fetchBanks() {
      try {
        const response = await axios.get('http://localhost:4000/api/banks');
        setBanks(response.data.banks);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBanks();

//    const interval = setInterval(() => {
    //     fetchBanks();
    // }, 1000);

    // return () => clearInterval(interval); // Cleanup the interval on component unmount


  }, []);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className="view-banks-button" onClick={handleModalOpen}>View Banks</button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="bank-list-modal">
        <h2 className="modal-title">All Accounts</h2>
        {banks.length === 0 ? (
          <p>No banks found.</p>
        ) : (
          <ul className="bank-list">
            {banks.map((bank) => (
              <li key={bank._id} className="bank-item">
                 <div className="bank-info">
                  <span className="bank-account-number">Name:</span>
                  <span className="bank-account-value">{bank.name}</span>
                </div>
                <div className="bank-info">
                  <span className="bank-account-number">Account Number:</span>
                  <span className="bank-account-value">{bank.accountNumber}</span>
                </div>
                <div className="bank-info">
                  <span className="bank-balance-label">Balance:</span>
                  <span className="bank-balance-value">{bank.balance}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button className="close-button" onClick={handleModalClose}>Close</button>
      </Modal>
    </div>
  );
};

export default BankListModal;
