import React, { useState, useEffect } from "react";
import axios from "axios";

function FreelancerPage() {
  const [freelancerData, setFreelancerData] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // Get the token from local storage

  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/freelancer/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFreelancerData(res.data);
        setError("");
      } catch (err) {
        setFreelancerData(null);
        setError(err.response?.data?.message || "An error occurred");
      }
    };

    fetchFreelancerData();
  }, [token]);



  return (
    <div>
      <h1>heyyyy Freelancer</h1>
      {freelancerData ? (
        <div>
          <h2>Welcome, {freelancerData.name}!</h2>
          <p>Email: {freelancerData.email}</p>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default FreelancerPage;
