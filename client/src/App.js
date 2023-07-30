import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Routes from "./Routes";
import MainNavigation from "./components/layout/MainNavigation";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faCheckCircle,
  faUsers,
  faLock,
  faRocket,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import myImage from "./assets/logo.png";
import ux from "./assets/ux.jpg";
import fullstack from "./assets/fullstack.jpg";
import mobile from "./assets/mobile.jpg";
import pp1 from "./assets/pp1.jpg";
import pp2 from "./assets/pp2.jpg";
import pp3 from "./assets/pp3.jpg";
import pp4 from "./assets/pp4.jpg";
import blog1 from "./assets/blog1.jpg";
import blog2 from "./assets/blog2.jpg";
import blog3 from "./assets/blog3.jpg";

function App(props) {
  const { location } = props;
  const isHomePage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/Register";
  const isLoginPage = location.pathname === "/Login";
  const isAboutPage = location.pathname === "/About";
  const isFAQPage = location.pathname === "/FAQ";

  return (
    <div className="container">
      {isHomePage && <MainNavigation />}
      {isRegisterPage && <MainNavigation />}
      {isLoginPage && <MainNavigation />}
      {isAboutPage && <MainNavigation />}
      {isFAQPage && <MainNavigation />}

      <Switch>
        <Route exact path="/">
          <section className="hero">
            <img src={myImage} alt="My Image" />
            <h1 className="hero-title1">How work</h1>
            <h1 className="hero-title2">should work</h1>
            <p className="sub-title1">
              Forget the old rules. You can have the best people.
            </p>
            <p className="sub-title1">Right now. Right here.</p>
          </section>
          <Link to="/register" className="cta-button">
            Get Started
          </Link>

          <section className="featured-job">
            <div className="featured-job-container">
              <h2 className="section-title pulse">Featured Job</h2>
              <div className="featured-job-card">
                <div className="featured-job-card-image">
                  <img src={fullstack} alt="Featured Job" />
                </div>
                <div className="featured-job-card-content">
                  <h3 className="featured-job-card-title">
                    Full Stack Developer
                  </h3>
                  <p className="featured-job-card-company">ABC Company</p>
                  <div className="featured-job-card-details">
                    <p>
                      <i className="fas fa-map-marker-alt"></i> Location: New
                      York
                    </p>
                    <p>
                      <i className="fas fa-clock"></i> Type: Full-time
                    </p>
                    <p>
                      <i className="fas fa-money-bill-wave"></i> Salary: $100k -
                      $120k
                    </p>
                  </div>
                  <p className="featured-job-card-description">
                    We're seeking a talented Full Stack Developer to join our
                    team at ABC Company! As a Full Stack Developer, you'll be
                    responsible for building and maintaining web applications,
                    working with a variety of programming languages and
                    frameworks. You'll collaborate with a team of developers and
                    designers to create cutting-edge solutions that meet our
                    clients' needs. We offer a competitive salary and benefits
                    package, as well as opportunities for growth and advancement
                    within the company.
                  </p>
                  <Link to="/register" className="button cta-button">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="featured-jobs">
            <div className="featured-job-card">
              <div className="featured-job-card-image">
                <img src={mobile} alt="Featured Job" />
              </div>
              <div className="featured-job-card-content">
                <h3 className="featured-job-card-title">
                  Mobile App Developer
                </h3>
                <p className="featured-job-card-company">
                  XYZ Mobile Solutions
                </p>
                <div className="featured-job-card-details">
                  <p>
                    <i className="fas fa-map-marker-alt"></i> Location: San
                    Francisco
                  </p>
                  <p>
                    <i className="fas fa-clock"></i> Type: Full-time
                  </p>
                  <p>
                    <i className="fas fa-money-bill-wave"></i> Salary: $90k -
                    $110k
                  </p>
                </div>
                <p className="featured-job-card-description">
                  Are you a talented mobile app developer with a passion for
                  innovation? Join our team at XYZ Mobile Solutions and work on
                  cutting-edge projects that make a difference in people's
                  lives. You'll collaborate with a group of talented developers
                  and designers to create amazing apps for our clients.
                </p>
                <Link to="/register" className="button cta-button">
                  Apply Now
                </Link>
              </div>
            </div>
          </section>
          <section className="featured-job">
            <div className="featured-job-container">
              <h2 className="section-title"> </h2>
              <div className="featured-job-card">
                <div className="featured-job-card-image">
                  <img src={ux} alt="Featured Job" />
                </div>
                <div className="featured-job-card-content">
                  <h3 className="featured-job-card-title">UX Designer</h3>
                  <p className="featured-job-card-company">XYZ Company</p>
                  <div className="featured-job-card-details">
                    <p>
                      <i className="fas fa-map-marker-alt"></i> Location: San
                      Francisco
                    </p>
                    <p>
                      <i className="fas fa-clock"></i> Type: Full-time
                    </p>
                    <p>
                      <i className="fas fa-money-bill-wave"></i> Salary: $90k -
                      $110k
                    </p>
                  </div>
                  <p className="featured-job-card-description">
                    Are you passionate about designing user-centered digital
                    experiences? We are looking for a UX Designer to join our
                    dynamic team! As a UX Designer, you will collaborate with
                    cross-functional teams to create innovative and intuitive
                    designs for our products.
                  </p>
                  <Link to="/register" className="button cta-button">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="why-choose-us">
            <h2 className="section-title pulse">Why Choose Us</h2>
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <div className="why-choose-us-card-content">
                <h3 className="why-choose-us-card-title">Quality Work</h3>
                <p className="why-choose-us-card-description">
                  We only work with the best freelancers and top employers to
                  ensure quality work.
                </p>
              </div>
            </div>
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="why-choose-us-card-content">
                <h3 className="why-choose-us-card-title">Talent Pool</h3>
                <p className="why-choose-us-card-description">
                  Access a pool of talented freelancers and top job
                  opportunities.
                </p>
              </div>
            </div>
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div className="why-choose-us-card-content">
                <h3 className="why-choose-us-card-title">Secure Platform</h3>
                <p className="why-choose-us-card-description">
                  Our platform is secure and ensures the safety and privacy of
                  your data.
                </p>
              </div>
            </div>
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-icon">
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              <div className="why-choose-us-card-content">
                <h3 className="why-choose-us-card-title">Recognition</h3>
                <p className="why-choose-us-card-description">
                  Gain recognition and advance your career with our top-rated
                  platform.
                </p>
              </div>
            </div>
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="why-choose-us-card-content">
                <h3 className="why-choose-us-card-title">Passion</h3>
                <p className="why-choose-us-card-description">
                  We are passionate about connecting the best freelancers with
                  the best employers.
                </p>
              </div>
            </div>
            <div className="why-choose-us-card">
              <div className="why-choose-us-card-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
              <div className="why-choose-us-card-content">
                <h3 className="why-choose-us-card-title">Growth</h3>
                <p className="why-choose-us-card-description">
                  Our platform offers opportunities for growth and development
                  for both freelancers and employers.
                </p>
              </div>
            </div>
          </section>
          <section class="social-proof">
            <h2 class="section-title pulse">Social Proof</h2>
            <div class="social-proof-cards">
              <div class="social-proof-card">
                <div class="social-proof-card-image">
                  <img src={pp3} alt="User Avatar" />
                </div>
                <div class="social-proof-card-content">
                  <p class="social-proof-card-description">
                    "This platform has helped me find amazing freelancers for my
                    business. Highly recommend it!"
                  </p>
                  <p class="social-proof-card-name">
                    - Leonardo DiCaprio, Business Owner
                  </p>
                </div>
              </div>
              <div class="social-proof-card">
                <div class="social-proof-card-image">
                  <img src={pp2} alt="User Avatar" />
                </div>
                <div class="social-proof-card-content">
                  <p class="social-proof-card-description">
                    "I was able to land my dream job through this platform.
                    Thank you so much!"
                  </p>
                  <p class="social-proof-card-name">- Jane Doe, Freelancer</p>
                </div>
              </div>
              <div class="social-proof-card">
                <div class="social-proof-card-image">
                  <img src={pp1} alt="User Avatar" />
                </div>
                <div class="social-proof-card-content">
                  <p class="social-proof-card-description">
                    "I've been using this platform for a few months now and it's
                    been a game-changer for my business. Highly recommend it!"
                  </p>
                  <p class="social-proof-card-name">
                    - Sarah Johnson, Entrepreneur
                  </p>
                </div>
              </div>
              <div class="social-proof-card">
                <div class="social-proof-card-image">
                  <img src={pp4} alt="User Avatar" />
                </div>
                <div class="social-proof-card-content">
                  <p class="social-proof-card-description">
                    "The customer support on this platform is top-notch. They
                    always go above and beyond to help me with any issues I
                    have."
                  </p>
                  <p class="social-proof-card-name">- Will Smith, Freelancer</p>
                </div>
              </div>
            </div>
          </section>
          <section class="blog">
            <div class="containerp">
              <h2 class="section-title">Latest Blog Posts</h2>
              <div class="row">
                <div class="col-md-6 col-lg-4">
                  <div class="blog-card">
                    <div class="blog-card-image">
                      <img src={blog1} alt="Blog Post" />
                    </div>
                    <div class="blog-card-content">
                      <h3 class="blog-card-title">
                        5 Tips for Freelancers to Improve Productivity
                      </h3>
                      <p class="blog-card-date">April 22, 2023</p>
                      <p class="blog-card-description">
                        As a freelancer, staying productive can be a real
                        challenge. There are always distractions and other
                        things vying for your attention, and it can be tough to
                        stay on task. However, there are some things you can do
                        to improve your productivity and get more done. Here are
                        five tips for freelancers to improve productivity:
                      </p>
                      <ul className="blog-card-list">
                        <li>Set clear goals and deadlines</li>
                        <li>Create a schedule and stick to it</li>
                        <li>Take breaks and exercise regularly</li>
                        <li>Eliminate distractions</li>
                        <li>Use tools and apps to help you stay organized</li>
                      </ul>
                      <a href="#" class="blog-card-read-more">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="blog-card">
                    <div class="blog-card-image">
                      <img src={blog2} alt="Blog Post" />
                    </div>
                    <div class="blog-card-content">
                      <h3 class="blog-card-title">
                        10 Tips for Employers to Hire the Right Freelancer
                      </h3>
                      <p class="blog-card-date">April 21, 2023</p>
                      <p class="blog-card-description">
                        As an employer, hiring the right freelancer for your
                        project can make all the difference. However, with so
                        many freelancers out there, it can be tough to know
                        where to start. Here are 10 tips for employers to hire
                        the right freelancer:
                      </p>
                      <ol class="blog-card-list">
                        <li>Be clear about your project requirements</li>
                        <li>Check the freelancer's portfolio and references</li>
                        <li>Communicate effectively with the freelancer</li>
                        <li>Agree on a project timeline and milestones</li>
                        <li>Set a realistic budget for the project</li>
                        <li>
                          Consider the freelancer's experience and expertise
                        </li>
                        <li>Ask for a sample of the freelancer's work</li>
                        <li>Consider the freelancer's communication skills</li>
                        <li>Ask for a detailed project proposal</li>
                        <li>
                          Trust your instincts and choose the freelancer who
                          feels right for your project
                        </li>
                      </ol>
                      <a href="#" class="blog-card-read-more">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="blog-card">
                    <div class="blog-card-image">
                      <img src={blog3} alt="Blog Post" />
                    </div>
                    <div class="blog-card-content">
                      <h3 class="blog-card-title">
                        The Benefits of Remote Work for Employees and Employers
                      </h3>
                      <p class="blog-card-date">April 20, 2023</p>
                      <p class="blog-card-description">
                        Remote work has become increasingly popular in recent
                        years, and for good reason. It offers many benefits for
                        both employees and employers. For employees, remote work
                        can provide greater flexibility, a better work-life
                        balance, and the ability to work from anywhere. For
                        employers, it can lead to increased productivity, lower
                        overhead costs, and access to a larger talent pool. In
                        this blog post, we'll take a closer look at the benefits
                        of remote work for both employees and employers.
                      </p>
                      <ul class="blog-card-list">
                        <li>Greater flexibility for employees</li>
                        <li>A better work-life balance</li>
                        <li>Increased productivity for employers</li>
                        <li>Lower overhead costs for employers</li>
                        <li>Access to a larger talent pool for employers</li>
                      </ul>
                      <a href="#"class="blog-card-read-more">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/faq">
          <FAQ />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Routes />
      </Switch>
      <footer>
  <div class="social">
 
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
  <ul class="list-inline">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">FAQ</a></li>
    <li><a href="#">Register</a></li>
    <li><a href="#">Login</a></li>

  </ul>
  <p class="footer-text">Freelance System © 2023</p>
</footer>

    </div>
  );
}

export default withRouter(App);
