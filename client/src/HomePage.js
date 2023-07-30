import React, { useState } from "react";
import "./register.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    step: 1,
    name: "",
    email: "",
    password: "",
    password2: "",
    username: "",
    age: "",
    phone: "",
    country: "",
    city: "",
    userType: "",
  });

  const {
    step,
    name,
    email,
    password,
    password2,
    username,
    age,
    phone,
    country,
    city,
    userType,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const nextStep = () => {
    setFormData({ ...formData, step: step + 1 });
  };

  const prevStep = () => {
    setFormData({ ...formData, step: step - 1 });
  };

  return (
    <div className="sign-up-form-container">
      <div className="sign-up-form">
        <h1 className="form-title">Sign Up</h1>
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
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={onChange}
                minLength="6"
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
              <button
                type="button"
                className="btn btn-primary next-button"
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
              Step 2: Enter your personal details
            </p>
            <div className="form-group">
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={age}
                onChange={onChange}
                required
                min="18"
                max="90"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={onChange}
                required
                className="form-control"
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
              <label className="user-type-label">User Type:</label>
              <div className="user-type-radio">
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="buyer"
                    onChange={onChange}
                    checked={userType === "buyer"}
                    required
                  />{" "}
                  Buyer
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="seller"
                    onChange={onChange}
                    checked={userType === "seller"}
                    required
                  />{" "}
                  Seller
                </label>
              </div>
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-secondary prev-button"
                onClick={prevStep}
              >
                Previous
              </button>
              <button type="submit" className="btn btn-primary submit-button">
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
