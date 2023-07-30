import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./freelancerMessage.css";

const MessagesByReceiver = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSender, setSelectedSender] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    window.location.reload();
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
          `http://localhost:4000/api/messages/${response2.data._id}`
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

  const handleReply = (senderId) => {
    setSelectedSender(senderId);
    setReplyContent("");
  };

  const handleCancel = () => {
    setSelectedSender(null);
    setReplyContent("");
  };

  const handleSend = async (senderId) => {
    const token = localStorage.getItem("token");

    const response3 = await axios.get(
      `http://localhost:4000/api/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await axios.post(
      `http://localhost:4000/api/replaymessage/${response3.data._id}/${senderId}`,
      {
        content: replyContent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update the messages state by adding the new message object
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        ...response.data,
        sender: { _id: response.data.sender, email: response3.data.email },
      },
    ]);

    setSelectedSender(null);
    setReplyContent("");
  };

  return (
    <div>
      <button onClick={handleModalOpen} id="handelModal">
        Message
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="messages-grid">
          <h2>Messages</h2>
          {Object.keys(messagesBySender).map((senderId) => (
            <div key={senderId} className="messages-grid-item">
              <h3>From: {messagesBySender[senderId][0].sender.fullName}</h3>
              <ul className="messages-list">
                {messagesBySender[senderId].map((message, index) => (
                  <li
                    key={message._id}
                    className={`message-item ${
                      index === messagesBySender[senderId].length - 1
                        ? "right"
                        : "left"
                    }`}
                  >
                    <p>{message.content}</p>
                  </li>
                ))}
              </ul>
              {selectedSender === senderId ? (
                <div className="reply-form">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your message here..."
                  />
                  <div className="reply-buttons">
                    <button onClick={handleCancel}>Cancel</button>
                    <button
                      className="send-button"
                      onClick={() => handleSend(senderId)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="reply-button"
                  onClick={() => handleReply(senderId)}
                >
                  Reply
                </button>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default MessagesByReceiver;
