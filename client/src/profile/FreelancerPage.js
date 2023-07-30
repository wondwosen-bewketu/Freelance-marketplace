import { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import axios from "axios";
import "../profile/style.css";
import avater from "../assets/avater.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import blog1 from "../assets/abt.jpg";
import blog2 from "../assets/company.jpg";
import FreelancerNavigation from "../components/freelancerNavigation";
import CreateWalletModal from "./creaatWalletFreelancer";
import WithdrawModal from "./withdrawModal";
import MessagesByReceiver from "./freelancerMessage";
import EditFreelancerProfile from "./EditFreelancerProfile";
import FeedBack from "./freelancerFeedback";

const FreelancerPage = () => {
  const history = useHistory();
  const [freelancer, setFreelancer] = useState({});
  const [balance, setBalance] = useState(0); // add this
  const { id } = useParams();
  const [freelancerSkills, setFreelancerSkills] = useState([]); // add this

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:4000/api/freelancer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFreelancer(response.data);
        setFreelancerSkills(response.data.skills); // set the freelancer skills
      } catch (error) {
        console.error(error);
      }
    };
    fetchFreelancer();

    //   const interval = setInterval(() => {
    //     fetchFreelancer();
    // }, 1000);

    // return () => clearInterval(interval); // Cleanup the interval on component unmount

  }, [id]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/api/bank/freelancer/${id}/balance`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalance();
  }, [id]);

  useEffect(() => {
    history.push({ state: { freelancerId: id } });
  }, [id, history]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    history.push("/login"); // Redirect to the login page
  };

  return (
    <div>
      <FreelancerNavigation />
      <main>
        <div className="main-content">
          <img
            src={`http://localhost:4000/${freelancer.profileImage}`}
            alt="avatar"
            className="avatar"
          />
          <h2 className="username">{freelancer.username}</h2>
          <p className="employer-info">
            My name is {freelancer.fullName} and I am a Freelancer and I am a {freelancer.professionalTitle} Developer
          </p>
          <p> </p>
          <ul className="nav">
            <li>
              <EditFreelancerProfile/>
            </li>
            <li>
             <FeedBack/>
            </li>
            <li>
              <MessagesByReceiver />
            </li>
            <li>
              <button onClick={handleLogout} className="logoutbutton">Logout</button>
            </li>
          </ul>
          <div className="customization">
            <h3>Customization Options</h3>
            <p>
              Customize your profile and job offers to stand out from the
              competition
            </p>
            <EditFreelancerProfile/>
          </div>
          <div className="customer-support">
            <h3>Customer Support</h3>
            <p>Contact our customer support team for any questions or issues</p>
            <FeedBack/>
          </div>
        </div>

        <article className="article-container">
         
          <div className="employer-info">
            <h3>Careers at Our Company</h3>
            <img src={blog2} alt="career image" />
            <p>
              We are always on the lookout for talented individuals to join our
              team. If you are passionate about software development and want to
              work in a dynamic environment that fosters growth and creativity,
              we would love to hear from you.
            </p>
            <button>View Open Positions</button>
          </div>
          <div className="employer-info">
            <h3>Our Company</h3>
            <img src={blog1} alt="company image" />
            <p>
              We are a leading company in the field of software development,
              with a focus on innovation and quality. Our team of experts has
              extensive experience in delivering world-class solutions to
              clients all over the world.
            </p>
          </div>
        </article>
        <aside>
          <div className="aside-content">
            <div className="wallet">
            <FontAwesomeIcon icon={faWallet} className="wallecticon"/>
              <h3>Hourly Rate: {freelancer.hourlyRate}</h3>
              <h3>Wallet Balance: {balance}$</h3>
              <CreateWalletModal />
              <WithdrawModal />
            </div>
            <div className="contact">
            <FontAwesomeIcon icon={faAddressCard} className="contacticon"/>
              <ul>
                <li> <FontAwesomeIcon icon={faEnvelope} className="addressicon"/>:{freelancer.email}</li>
                <li> <FontAwesomeIcon icon={faPhone} className="addressicon"/>: {freelancer.phone}</li>
                <li> <FontAwesomeIcon icon={faFlag} className="addressicon"/>: {freelancer.country}</li>
                <li> <FontAwesomeIcon icon={faBuilding} className="addressicon"/>: {freelancer.city}</li>
              </ul>
            </div>
            <div className="reputation">
              <h3>Reputation</h3>
              <span className="icon star-icon gold">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon star-icon gold">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon star-icon gold">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon star-icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="icon star-icon">
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
            <div className="social-media-icons">
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
              </a>
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
              </a>
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>
              </a>
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default FreelancerPage;
