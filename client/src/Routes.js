import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import EmployerPage from "./profile/EmployerPage";
import FreelancerPage from "./profile/FreelancerPage";
import EditEmployerProfile from "./profile/EditEmployerProfile";
import EditFreelancerProfile from "./profile/EditFreelancerProfile";
import BrowseEmployer from "./profile/BrowseEmployer";
import BrowseFreelancer from "./profile/BrowseFreelancer";
import EmployerProfile from "./profile/EmployerProfile";
import FreelancerProfile from "./profile/FreelancerProfile";
import PostJob from "./profile/PostJob";
import BrowseJob from "./profile/BrowseJob";
import BrowseAllJob from "./profile/BrowseAllJob";
import ApplyJob from "./profile/ApplyJob";
import Applications from "./profile/Applications";
import NotFound from "./profile/NotFound";
import FeedbackForm from "./profile/FeedBack";
import Freelancerfeedback from "./profile/freelancerFeedback";
import Message from "./profile/message";
import FreelanceMessage from "./profile/freelancerMessage";
import EmployerMessage from "./profile/employerMessage";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthenticated = !!token;

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  
  

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login onLoginSuccess={handleLoginSuccess} />
        </Route>
        <ProtectedRoute
          path="/employer/:id"
          component={EmployerPage}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/freelancer/:id"
          component={FreelancerPage}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/feedback">
          <FeedbackForm token={token} />
        </Route>
        <ProtectedRoute
          path="/update_employers"
          component={EditEmployerProfile}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/update_freelancers"
          component={EditFreelancerProfile}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/browse_employers"
          component={BrowseEmployer}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/browse_freelancers"
          component={BrowseFreelancer}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/employers/:id">
          <EmployerProfile />
        </Route>
        <Route path="/freelancers/:id">
          <FreelancerProfile />
        </Route>
        <ProtectedRoute
          path="/PostJob"
          component={PostJob}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/browse_jobs"
          component={BrowseJob}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/browse_all_jobs"
          component={BrowseAllJob}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/freelancerFeedback"
          component={Freelancerfeedback}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/apply_job/:id"
          component={ApplyJob}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/applicants/:jobId"
          component={Applications}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/message"
          component={Message}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/freelanceMessage"
          component={FreelanceMessage}
          isAuthenticated={isAuthenticated}
        />
        <ProtectedRoute
          path="/employerMessage"
          component={EmployerMessage}
          isAuthenticated={isAuthenticated}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
