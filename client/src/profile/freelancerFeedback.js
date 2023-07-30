import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FeedBack.css";

Modal.setAppElement("#root");

const FeedBacke = () => {
  const [formData, setFormData] = useState({
    name: "",
    email:"",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // 'submitting', 'success', or 'error'
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // get user data from backend and populate form
    axios
      .get("http://localhost:4000/api/viewfreelancerprofile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setFormData({
          name: res.data.fullName,
          email: res.data.email,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus("submitting");
      const response = await axios.post(
        "http://localhost:4000/api/feedback",
        {
          fullName: formData.name,
          email: formData.email,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Clear form fields and error message
      setFormData({
        name: "",
        email: "",
      });
      setMessage("");
      toast.success("feedback submited successfully")
      setStatus("success");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div>
   <button onClick={openModal} className="btn btn-primary">Feedback</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
        >
 
    <div className="feedback-container">
    <button onClick={handleModalClose}>x</button>
      <h1 className="title">Feedback Form</h1>
      {status === "success" && (
        <div className="success-message">
          <FaCheck size={24} /> Thank you for your feedback!
        </div>
      )}
      {status === "error" && (
        <div className="error-message">
          An error occurred. Please try again later.
        </div>
      )}
      <form onSubmit={handleSubmit} className="feedbackForm">
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows="20" // set the number of rows here
          />
        </div>

        {status === "submitting" ? (
          <button type="submit" disabled>
            Submitting...
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
    </Modal>
    </div>
  );
};

export default FeedBacke;
