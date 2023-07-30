import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import "./message.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const location = useLocation();
  const freelancerId = location.state.freelancerId;

  const sendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response2 = await axios.get(`http://localhost:4000/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    console.log("response2")
    console.log(response2)
    try {
      const response = await axios.post(`http://localhost:4000/api/sendmessage/${response2.data._id}/${freelancerId}`, { // Include receiver ID in URL
        content,
      });
      setMessages([...messages, response.data]);
      setContent("");
      console.log("response");
      console.log(response);
      toast.success("Message Sent Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="message-container">
      <h2 className="message-heading">Messages</h2>
      <div className="message-list">
        
      </div>
      <form className="message-form" onSubmit={sendMessage}>
        <input
          className="message-input"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="message-button" type="submit">Send</button>
      </form>
    </div>
  );
};

export default Message;
