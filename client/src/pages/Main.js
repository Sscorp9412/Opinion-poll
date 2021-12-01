import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./partials/Search";
import Filter from "./partials/Filters";
import Issue from "./Issue/Issue";

// Login popup
import Login from "./auth/Login";
// signup popup
import Signup from "./auth/Signup";
// createIssue popup
import CreateIssue from "./Issue/Form";

const Main = (props) => {
   const [issues, setIssues] = useState([]);

   const handleIssues = (updatedIssues) => {
       setIssues(updatedIssues);
   }

   //   use effect
   useEffect(() => {
      axios
         .get("http://localhost:4001/api/issues/view", {
            headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
         })
         .then((response) => {
            switch (response.status) {
               case 200:
                  setIssues(response.data.issues);
                  break;
               default:
                  console.log("issues did not loaded");
            }
         });
   }, []);

   return (
      <>
         <main className="content">
            <div className="settings">
               <Search />
               <Filter />
            </div>
            <div className="issue-box">
               <ul className="issue-list">
                  {issues.map((issue, index) => {
                     return <Issue key={index} hash={index + 1} issue={issue} />;
                  })}
               </ul>
            </div>
         </main>

         {/* Login Box */}
         {props.isLoginPopupOpen ? (
            <Login handleLoginPopup={props.handleLoginPopup} />
         ) : (
            <></>
         )}

         {/* Sign up Box */}
         {props.isSignupPopupOpen ? (
            <Signup handleSignupPopup={props.handleSignupPopup} />
         ) : (
            <></>
         )}

         {/* {Create Issue Box} */}
         {props.isCreateIssuePopupOpen ? (
            <CreateIssue
               handleCreateIssuePopup={props.handleCreateIssuePopup}
               handleIssues = {handleIssues}
            />
         ) : (
            <></>
         )}
      </>
   );
};

export default Main;
