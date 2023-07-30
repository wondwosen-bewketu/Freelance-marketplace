import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import validator from "validator";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const history = useHistory(); // define history object using useHistory hook

  const [formData, setFormData] = useState({
    step: 1,
    name: "",
    email: "",
    password: "",
    password2: "",
    username: "",
    dateOfBirth: "", // Change the field name from "age" to "dateOfBirth"
    gender: "",
    phone: "",
    country: "",
    city: "",
    userType: "",
    profileImage: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    step,
    name,
    email,
    password,
    password2,
    username,
    dateOfBirth,
    gender,
    phone,
    country,
    city,
    userType,
    profileImage,
  } = formData;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };

  const nextStep = () => {
    setFormData({ ...formData, step: step + 1 });
  };

  const prevStep = () => {
    setFormData({ ...formData, step: step - 1 });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Calculate the age based on the selected date of birth
    const currentDate = new Date();
    const selectedDate = new Date(dateOfBirth);
    const age = Math.floor(
      (currentDate - selectedDate) / (365.25 * 24 * 60 * 60 * 1000)
    );

    // Check if age is within valid range
    if (age < 18 || age > 90) {
      toast.error("Age must be between 18 and 90.");
      return;
    }

    // Validate phone number
    if (!isValidPhoneNumber(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    // Check if password is strong enough
    if (!validator.isStrongPassword(password)) {
      toast.error("Password is not strong enough");
      return;
    }

    // Check if password and confirm password match
    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password2", password2);
      formData.append("dateOfBirth", selectedDate);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("phone", phone);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("userType", userType);
      formData.append("profileImage", profileImage);

      const response = await axios.post(
        "http://localhost:4000/api/signup",
        formData
      );

      console.log(response.data);

      setFormData({
        step: 1,
        name: "",
        email: "",
        password: "",
        password2: "",
        username: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        country: "",
        city: "",
        userType: "",
        profileImage: "",
      });

      toast.success(
        `Registration successful! Please check your email for verification.`
      ); // Display the success message
    } catch (err) {
      const error = err.response.data;
      toast.error(error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <div className="register-containero">
        <form className="formo" onSubmit={onSubmit}>
          <h1 className="large text-primary">Sign Up</h1>
          {step === 1 && (
            <div>
              <p className="lead step-title">
                Step 1: Enter your personal details
              </p>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={onChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="date" // Change the input type to "date"
                  placeholder="Date of Birth"
                  name="dateOfBirth" // Update the field name from "age" to "dateOfBirth"
                  value={dateOfBirth}
                  onChange={onChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Gender*
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={onChange}
                  required
                  className="form-control"
                >
                  <option value="">* Choose Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div className="form-group password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  minLength={6}
                  className="form-control"
                />
                <span
                  className={`password-toggle ${showPassword ? "show" : ""}`}
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="fas"
                  />
                </span>
              </div>
              <div className="form-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  minLength={6}
                  className="form-control"
                />
                <span
                  className={`password-toggle ${
                    showConfirmPassword ? "show" : ""
                  }`}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </span>
              </div>

              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary next-buttonnn"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="lead step-title">
                Step 2: Enter your personal address
              </p>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <PhoneInput
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(value) => {
                    setFormData({ ...formData, phone: value });
                  }}
                  required
                  className="form-control"
                  countrySelectProps={{ unicodeFlags: true }}
                  international
                  displayInitialValueAsLocalNumber
                  displayInitialCountry={false}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={country}
                  onChange={onChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={onChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="userType" className="form-label">
                  User Type*
                </label>
                <select
                  name="userType"
                  id="userType"
                  value={userType}
                  onChange={onChange}
                  required
                  className="form-control"
                >
                  <option value="">* Select User Type</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Employer">Employer</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="profileImage" className="form-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-secondary back-button"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <p>
                  Already have an account?<Link to={"/login"}>Log In</Link>
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
