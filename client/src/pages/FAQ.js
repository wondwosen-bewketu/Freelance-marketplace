import React from "react";
import "./faq.css";

function FAQ() {
  return (
    <div className="faq-container">
      <h1 className="faq-heading">Frequently Asked Questions</h1>
      <ul className="faq-list">
        <li className="faq-item">
          <strong className="faq-question">What is this website?</strong>
          <span className="faq-answer">This website is a freelance platform where clients can find and 
          hire freelance professionals for their projects.</span>
        </li>
        <li className="faq-item">
          <strong className="faq-question">How do I hire a freelancer?</strong>
          <span className="faq-answer">To hire a freelancer, simply post your project on the platform and 
          wait for freelancers to bid on your project. You can then review the bids and choose a freelancer to work with.</span>
        </li>
        <li className="faq-item">
          <strong className="faq-question">How do I get paid as a freelancer?</strong>
          <span className="faq-answer">Once you complete a project for a client, they will release the payment to you through the platform. 
          You can then withdraw the funds to your preferred payment method.</span>
        </li>
        <li className="faq-item">
          <strong className="faq-question">Is this platform free to use?</strong>
          <span className="faq-answer">Yes, this platform is free to use for both clients and freelancers. However, 
          the platform takes a commission fee on all projects.</span>
        </li>
        <li className="faq-item">
          <strong className="faq-question">What types of projects can I post?</strong>
          <span className="faq-answer">You can post any type of project on the platform, as long as it does not violate our terms of service.</span>
        </li>
      </ul>
    </div>
  );
}

export default FAQ;
