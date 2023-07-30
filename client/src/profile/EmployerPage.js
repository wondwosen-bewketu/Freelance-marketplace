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
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import {
  faTwitter,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import blog1 from "../assets/abt.jpg";
import blog2 from "../assets/company.jpg";
import blog6 from "../assets/blog6.jpg";
import ProfileNavigation from "../components/layout/profileNavigation";
import CombinedModal from "./wallet";
import MessageList from "./employerMessage";
import EditEmployerProfile from "./EditEmployerProfile";
import FeedBack from "./FeedBack";

const EmployerPage = () => {
  const history = useHistory();
  const [employer, setEmployer] = useState({});
  const [balance, setBalance] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/api/employer/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployer(response.data);
        console.log(response.data._id);
      } catch (error) {
        console.error(error);
      }
    };
   

    fetchEmployer();

    //    const interval = setInterval(() => {
    //     fetchEmployer();
    // }, 1000);

    // return () => clearInterval(interval); // Cleanup the interval on component unmount
    
  }, [id]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/api/bank/employer/${id}/balance`,
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
    history.push({ state: { employerId: id } });
  }, [id, history]);

  

  return (
    <div>
      <ProfileNavigation />
      <main>
        <div className="main-content">
          <img src={`http://localhost:4000/${employer.profileImage}`} alt="avatar" className="avatar" /> 
         
            
              
        
               
              
          <h2 className="username">{employer.username}  
             
            </h2>
          <p className="employer-info">
            My name is {employer.fullName} and I am an employer. I am here to
            hire freelancers.
          </p>
          <ul className="nav">
            <li>
            <EditEmployerProfile />
            </li>
            <li>
              <Link to="/PostJob" onClick={() => history.push("/PostJob")} > 
              Post A Job Offer
              </Link>
            </li>
           
            <li>
           < FeedBack/>
            </li>
            <li>
              <MessageList />
            </li>
            <li>
            
            </li>
          </ul>
          <div className="customization">
            <h3>Customization Options</h3>
            <p>
              Customize your profile and job offers to stand out from the
              competition
            </p>
            <button  onClick={() => history.push("/update_employers")}>Customize Profile</button>
          </div>
          <div className="customer-support">
            <h3>Customer Support</h3>
            <p>Contact our customer support team for any questions or issues</p>
            <button onClick={() => history.push("/feedback")}>Contact Support</button>
          </div>
          <div className="employer-info">
            <h3>New Feature</h3> {/* Add a new feature section */}
            <img src={blog6} alt="feature image" /> {/* Replace 'featureImage' with the actual image source */}
            <p>
              This is a new feature that we are excited to announce. It will provide
              additional benefits to our users and improve their experience on our platform.
            </p>
            
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

              <h3>Balance: {balance}$</h3>
              <CombinedModal />
            </div>

            <div className="contact">
            <FontAwesomeIcon icon={faAddressCard} className="contacticon"/>

              <ul>
                <li>  <FontAwesomeIcon icon={faEnvelope} className="addressicon"/>: {employer.email}</li>
                <li> <FontAwesomeIcon icon={faPhone} className="addressicon"/>: {employer.phone}</li>
                <li><FontAwesomeIcon icon={faFlag} className="addressicon"/>: {employer.country}</li>
                <li> <FontAwesomeIcon icon={faBuilding} className="addressicon"/>: {employer.city}</li>
                <li> <FontAwesomeIcon icon={faGlobe} className="addressicon"/>: {employer.website}</li>
              </ul>
            </div>
            <div className="reputation">
              <h3 className="reputationicon">Reputation</h3>
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
            <div className="company">
            <FontAwesomeIcon icon={faUsers} className="contacticon"/>
              <ul>
                <li> <FontAwesomeIcon icon={faBuilding}  className="addressicon"/>:   {employer.company}</li>
                <li><FontAwesomeIcon icon={faGlobe} className="addressicon"/>: {employer.website}</li>
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
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
              </a>
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>
              </a>
            </div>
            <div className="new-feature-aside"> {/* Add a new section in the aside */}
              <h3>New Feature</h3>
              <img src={blog6} alt="feature image" /> {/* Replace 'featureImage' with the actual image source */}
              <p>
                This is a new feature that </p> 
                <p>we are excited to announce.  It will provide</p>
             
                <p>additional benefits to our users and </p>
                <p> improve their experience on our platform.
              </p>
             
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default EmployerPage;
