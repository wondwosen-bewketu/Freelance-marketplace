import React, { useState, useEffect } from "react";
import axios from "axios";
import "../profile/PostJob.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostJob = ({ token }) => {
  // Define state variables
  const [formData, setFormData] = useState({
    name: "",
  });
  const { name } = formData;
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [translation, setTranslation] = useState("");
  const [graphics, setGraphics] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);

  // Define event handlers
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/postJob",

        {
          fullName: name,
          jobTitle,
          jobDescription,
          jobCategory,
          translation,
          graphics,
          jobType,
          jobLevel,
          jobLocation,
          salary,
          jobStartDate,
          jobEndDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      toast("Post A Job successfully");

      // Clear form fields and error message
      setFormData({
        name: "",
      });
      setJobTitle("");
      setJobDescription("");
      setJobCategory("");
      setTranslation("");
      setGraphics("");
      setJobType("");
      setJobLevel("");
      setJobLocation("");
      setSalary("");
      setJobStartDate("");
      setJobEndDate("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create job. Please try again.");
    }
  };

  // Define event handlers for job category, translation, and graphics
  const handleJobCategoryChange = (e) => {
    setJobCategory(e.target.value);
    setTranslation("");
    setGraphics("");
  };

  const handleTranslationChange = (e) => {
    setTranslation(e.target.value);
    setJobCategory("");
    setGraphics("");
  };

  const handleGraphicsChange = (e) => {
    setGraphics(e.target.value);
    setJobCategory("");
    setTranslation("");
  };

  // Define helper function to move to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Define helper function to move to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Define effect hook to load user data
  useEffect(() => {
    // get user data from backend and populate form
    axios
      .get("http://localhost:4000/api/viewpemployerrofile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const { fullName } = response.data;
        setFormData({ name: fullName });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
        setErrorMessage("Failed to load user data. Please try again.");
      });
  }, []);

  return (
    <div>
      <header className="freelancerheader">
        <div>
          <h1 className="freelancerlogo">Freelance System</h1>
        </div>
      </header>
      <div className="postjob-container">
        <form onSubmit={handleSubmit} className="form-container">
          {step === 1 && (
            <>
              <h2>Post A Job</h2>
              <div className="form-job">
                <input
                  type="text"
                  name="naeme"
                  value={formData.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-job">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-job">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                  name="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                ></textarea>
              </div>
             

              <div className="form-job">
                <label htmlFor="jobType">Job Type</label>
                <select
                  name="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="form-job">
                <label htmlFor="jobLevel">Job Level</label>
                <select
                  name="jobLevel"
                  value={jobLevel}
                  onChange={(e) => setJobLevel(e.target.value)}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2>Job Detail</h2>
              <div className="form-job">
                <label htmlFor="jobCategory">Expectation skills</label>
                <select
                  name="jobCategory"
                  value={jobCategory}
                  onChange={handleJobCategoryChange}
                  disabled={translation || graphics !== ""}
                  required
                >
                  <option disabled value="">
                    Programming languages
                  </option>
                  <option value="ReactJs">ReactJs</option>
                  <option value="NodeJs">NodeJs</option>
                  <option value="python">python</option>
                  <option value="Flutter">Flutter</option>
                  <option value="Java">Java</option>
                  <option value="Angular">Angular</option>
                </select>

                <select
                  name="translation"
                  value={translation}
                  onChange={handleTranslationChange}
                  disabled={jobCategory || graphics !== ""}
                  required
                >
                  <option disabled value="">
                    Select Translation
                  </option>
                  <option value="English to Amharic">English to Amharic</option>
                  <option value="English to France">English to France</option>
                  <option value="English to Arabic">English to Arabic</option>
                </select>

                <select
                  name="graphics"
                  value={graphics}
                  onChange={handleGraphicsChange}
                  disabled={jobCategory || translation !== ""}
                  required
                >
                  <option disabled value="">
                    Select Graphics
                  </option>
                  <option value="Graphics Design">Graphics Design</option>
                </select>
              </div>

              <div className="form-job">
                <label htmlFor="jobLocation">Job Location</label>
                <input
                  type="text"
                  name="jobLocation"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  required
                />
              </div>
              <div className="form-job">
                <label htmlFor="salary">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="start date">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startdate"
                  value={jobStartDate}
                  onChange={(e) => setJobStartDate(e.target.value)}
                  placeholder="Start Date"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end date">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="enddate"
                  value={jobEndDate}
                  onChange={(e) => setJobEndDate(e.target.value)}
                  placeholder="End Date"
                  required
                  min={jobStartDate}
                />
              </div>

              <button type="button" onClick={prevStep} className="back">
                Previous
              </button>
              <button type="submit" className="back">
                Post
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
