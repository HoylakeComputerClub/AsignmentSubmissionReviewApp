import './App.css';
import { useLocalState } from './utils/useLocalStorage';
import { useState,  useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import HomePage from './HomePage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AssignmentView from './AssignmentView';
import CodeReviewerAssignmentView from './CodeReviewerAssignmentView';
import CodeReviewerDashboard from './Dashboards/CodeReviewerDashboard';
import Dashboard from './Dashboards/Dashboard';
import { useUser } from "./UserProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState([]);
  const user = useUser();

  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [user.jwt]);

  function getRolesFromJWT() {
    if (user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);

      return decodedJwt.authorities;
    }
    return [];
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:assignmentId"
        element={
          roles.find((role) => role === "ROLE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
