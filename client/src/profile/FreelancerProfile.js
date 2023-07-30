import { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import axios from "axios";
import "../profile/style.css";
import avater from "../assets/avater.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import blog1 from "../assets/abt.jpg";
import blog2 from "../assets/company.jpg";

const FreelancerProfile = () => {
  const history = useHistory();
  const [freelancer, setFreelancer] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/api/freelancers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFreelancer(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFreelancer();
  }, [id]);

  useEffect(() => {
    history.push({ state: { freelancerId: id } });
  }, [id, history]);

  return (
    <div>
       <header className='freelancerheader'>
    <div>
      <h1 className='freelancerlogo'>Freelance System</h1>
    </div>
    </header>
      <main>
        <div class="main-content">
        <img
            src={`http://localhost:4000/${freelancer.profileImage}`}
            alt="avatar"
            className="avatar"
          />
          <h2 className="username">{freelancer.username}</h2>
          <p className="employer-info">
            My name is {freelancer.fullName} and I am an Freelancer..
          </p>
          <p> </p>
          <div className="customization">
            <h3>Customization Options</h3>
            <p>
              Customize your profile and job offers to stand out from the
              competition
            </p>
       
          </div>
          <div className="customer-support">
            <h3>Customer Support</h3>
            <p>Contact our customer support team for any questions or issues</p>
          
          </div>
        </div>

        <article className="article-container">
          <div class="employer-info">
            <h3>Our Company</h3>
            <img src={blog1} alt="company image" />
            <p>
              We are a leading company in the field of software development,
              with a focus on innovation and quality. Our team of experts has
              extensive experience in delivering world-class solutions to
              clients all over the world.
            </p>
          </div>
          <div class="employer-info">
            <h3>Careers at Our Company</h3>
            <img src={blog2} alt="career image" />
            <p>
              We are always on the lookout for talented individuals to join our
              team. If you are passionate about software development and want to
              work in a dynamic environment that fosters growth and creativity,
              we would love to hear from you.
            </p>
          
          </div>
        </article>
        <aside>
          <div class="aside-content">
            <div class="wallet">
              <h3>My Wallet</h3>
              Hourly Rate: {freelancer.hourlyRate}
    
            </div>
            <div className="contact">
              <h3>Contact Information</h3>
              <ul>
                <li>Email: {freelancer.email}</li>
                <li>Mobile: {freelancer.phone}</li>
                <li>Country: {freelancer.country}</li>
                <li>City: {freelancer.city}</li>
                <li>Website: {freelancer.website}</li>
              </ul>
            </div>
            <div className="reputation">
              <h3>Reputation</h3>
              <span class="icon star-icon gold">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span class="icon star-icon gold">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span class="icon star-icon gold">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span class="icon star-icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span class="icon star-icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <div className="Company">
              <h3>Skill and Experience</h3>
              <ul>
                <li>Skill: {freelancer.skills}</li>
                <li>Experience: {freelancer.experience}</li>
                <li>Professional Title: {freelancer.professionalTitle}</li>
              </ul>
            </div>
            <div class="social-media-icons">
              <a href="#">
                <span class="icon">
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
              </a>
              <a href="#">
                <span class="icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
              </a>
              <a href="#">
                <span class="icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
              </a>
              <a href="#">
                <span class="icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default FreelancerProfile;
