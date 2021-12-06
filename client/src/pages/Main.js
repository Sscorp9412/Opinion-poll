import React, { useState, useEffect, useContext } from "react";
import store from "../redux/store";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Search from "./partials/Search";
import Filter from "./partials/Filters";
import Issues from "./Issue/Issues";

// Login popup
import Login from "./auth/Login";
// signup popup
import Signup from "./auth/Signup";
// createIssue popup
import CreateIssue from "./Issue/Form";
// create Logout
import Logout from "./auth/Logout";
import AuthContext from "../utilities/authContext";

const Main = (props) => {
   const [issues, setIssues] = useState([]);
   const [issuesHistory, setIssuesHistory] = useState([]);
   const { isAuth } = useContext(AuthContext);

   const handleIssues = (updatedIssues) => {
      setIssues(updatedIssues);
   };

   const handleIssuesHistory = (updatedIssues) => {
      setIssuesHistory(updatedIssues);
   };

   const handleGetRequest = () => {
      axios
         .get(`${process.env.REACT_APP_PROXY}/api/issues/view`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
         })
         .then((response) => {
            switch (response.status) {
               case 200:
                  store.dispatch({
                     type: "ADD_ISSUES",
                     payloads: { issues: response.data.issues }
                  });
                  break;
               default:
                  console.log("issues did not loaded");
            }
         });
   };

   //   use effect
   useEffect(() => {
      handleGetRequest();

      // eslint-disable-next-line
   }, []);

   store.subscribe(() => {
      handleIssues(store.getState().issues);
      handleIssuesHistory(store.getState().issues);
   });

   return (
      <>
         <main className="content">
            <div className="settings">
               <Search
                  issues={issues}
                  issuesHistory={issuesHistory}
                  handleIssues={handleIssues}
               />
               <Filter
                  issues={issues}
                  issuesHistory={issuesHistory}
                  handleIssues={handleIssues}
               />
            </div>
            <div className="issue-box">
               {isAuth ? (
                  <Issues issues={issues} />
               ) : (
                  <Issues issues={issues} />
               )}
            </div>
         </main>
         <Routes>
            <Route path="/login" element={<Login />}>
               <></>
            </Route>
            <Route path="/signup" element={<Signup />}>
               <></>
            </Route>
            <Route path="/create-issue" element={<CreateIssue />}>
               <></>
            </Route>
            <Route path="/logout" element={<Logout />}>
               <></>
            </Route>
            <Route path="/" element={<></>}>
               <></>
            </Route>
         </Routes>
      </>
   );
};

export default Main;
