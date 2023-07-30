import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './wallet.css';

const WalletActionsModal = ({ employerId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [walletCreated, setWalletCreated] = useState(false);

  const handleModalOpen = (action) => {
    if (action === "create" && !walletCreated) {
      setModalIsOpen(true);
      setAction("create");
    } else if (action === "create" && walletCreated) {
      toast.error("Wallet has already been created.");
    } else {
      setModalIsOpen(true);
      setAction(action);
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
      if (action === "create") {
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
      } else if (action === "deposit") {
        const response = await axios.post(
          `http://localhost:4000/api/bank/employer/${response2.data._id}/deposit`,
          { amount },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast("Deposit successfully");
      } else if (action === "send") {
        const response = await axios.post(
          `http://localhost:4000/api/bank/send-funds/${response2.data._id}`,
          { amount, accountNumber },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast("Send Money successfully");
      }

      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={() => handleModalOpen("create")} className="create-wallet-btn" disabled={walletCreated}>
        Create <span>&#x1F4B3;</span>

      </button>
      <button onClick={() => handleModalOpen("deposit")} id="deposit-btn">
        Deposit
      </button>
      <button onClick={() => handleModalOpen("send")} id="send-money-btn">
        Send Money
      </button>

      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            {action === "create" && <h2>Create Wallet</h2>}
            {action === "deposit" && <h2>Deposit</h2>}
            {action === "send" && <h2>Send Money</h2>}
          </div>
          <form className="modal-form" onSubmit={handleSubmit}>
            {action === "create" && (
              <>
                <label htmlFor="accountNumber">Account Number:</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </>
            )}
            {action === "deposit" && (
              <>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </>
            )}
            {action === "send" && (
              <>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="accountNumber">Recipient Account Number:</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </>
            )}
            <div className="modal-buttons">
              <button type="submit">
                {action === "create" && "Create Wallet"}
                {action === "deposit" && "Deposit"}
                {action === "send" && "Send"}
              </button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default WalletActionsModal;
