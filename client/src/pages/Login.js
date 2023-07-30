import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { GoogleLogin } from "react-google-login";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [googleToken, setGoogleToken] = useState(""); // state for storing Google authentication token

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
        userType,
      });
      const token = response.data.token;
      localStorage.setItem("token", token); // Store the token in local storage
      setError("");

      // Redirect to appropriate page based on user type
      const response2 = await axios.get(`http://localhost:4000/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      console.log("response2")
      console.log(response2)
      toast(`${response2.data.username} Login successfully`);
      if (userType === "Employer") {
        history.push(`/employer/${response2.data._id}`);
      } else if (userType === "Freelancer") {
        history.push(`/freelancer/${response2.data._id}`);
      }
    } catch (err) {
      if (err.response?.data?.message === 'Please verify your email before logging in') {
        setError(err.response.data.message);
      } else {
        setError(err.response?.data?.message || "An error occurred");
      }
    }
  };

  

  return (
    <div className="login-container">
      <form onSubmit={handleLoginSubmit} className="login-form">
        <h1 className="login-heading">Login</h1>
        {error && <p className="error-text">{error}</p>}
        <div className="form-groupp">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-groupp">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-groupp">
          <label htmlFor="userType">User Type:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="form-control"
          >
            <option value="">Select User Type</option>
            <option value="Employer">Employer</option>
            <option value="Freelancer">Freelancer</option>
          </select>
        </div>
        <button type="submit" className="btnlogin">
          Login
        </button>
       
        <p>
          Don't have an account? <Link to={"/register"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
