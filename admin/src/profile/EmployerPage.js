import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployerPage() {
  const [employerData, setEmployerData] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // Get the token from local storage

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/employer/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployerData(res.data);
        setError("");
      } catch (err) {
        setEmployerData(null);
        setError(err.response?.data?.message || "An error occurred");
      }
    };

    fetchEmployerData();
  }, [token]);

 

  return (
    <div>
       <h1>heyyyy Employer</h1>
      {employerData ? (
        <div>
         
          <h2>Welcome, {employerData.name}!</h2>
          <p>Email: {employerData.email}</p>
        
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default EmployerPage;
