import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./employerMessage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from '@fortawesome/free-brands-svg-icons';


const MessageList = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    window.location.reload();
  };

  const handleReplyChange = (event) => {
    setReplyContent(event.target.value);
  };

  const handleReplySubmit = async () => {
    const token = localStorage.getItem("token");

    const response4 = await axios.get(`http://localhost:4000/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    });

    try {
      const response3 = await axios.post(`http://localhost:4000/api/sendmessage/${response4.data._id}/${selectedMessage.receiver._id}`, {
        content: replyContent,
      });
      setMessages([...messages, response3.data]);
      setReplyContent("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const response2 = await axios.get(
        `http://localhost:4000/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      try {
        const response = await axios.get(
          `http://localhost:4000/api/displaymessages/${response2.data._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [receiverId]);

  // Group messages by sender
  const messagesBySender = messages.reduce((acc, cur) => {
    if (cur.sender && cur.sender._id) {
      if (acc[cur.sender._id]) {
        acc[cur.sender._id].push(cur);
      } else {
        acc[cur.sender._id] = [cur];
      }
    }
    return acc;
  }, {});

  return (
    <div>
      <button onClick={handleModalOpen} id="create-wallet-btn">
     Message
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <button onClick={handleModalClose} className="cancel-button">
            X
          </button>

          <h2>Messages for Receiver</h2>
          {Object.keys(messagesBySender).map((senderId) => (
            <div key={senderId} className="messages-grid-item">
              <h3>From: {messagesBySender[senderId][0].receiver.fullName}</h3>
              <ul>
                {messagesBySender[senderId].map((message) => (
                  <li key={message._id} className="message-item">
                    <p>{message.content}</p>
                    <button
                      onClick={() => setSelectedMessage(message)}
                      className="reply-button"
                    >
                      Reply
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {selectedMessage && (
            <div className="reply-form">
              <textarea
                placeholder="Type your reply here..."
                value={replyContent}
                onChange={handleReplyChange}
              />
              <button className="send-button" onClick={handleReplySubmit}>
                Send
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MessageList;
