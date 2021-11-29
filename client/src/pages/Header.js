import React, { useContext } from "react";
import AuthContext from "../utilities/authContext";
import localStorageClearData from "../utilities/handleLogout";

const Header = (props) => {
   const { isAuth, handleAuth } = useContext(AuthContext);
   const handleLoginButton = (e) => {
      e.preventDefault();
      props.handleLoginPopup();
   };

   const handleSignupButton = (e) => {
      e.preventDefault();
      props.handleSignupPopup();
   };

   const handleCreateIssueButton = (e) => {
      e.preventDefault();
      props.handleCreateIssuePopup();
   };

   const handleLogout = (e) => {
      e.preventDefault();
      localStorageClearData();
      handleAuth();
   };

   return (
      <header className="header">
         <div className="title-box">
            <h1 className="title">
               <span className="title--primary">Opinion Polls</span>
               <span className="title--sub">Believe in Responses</span>
            </h1>
         </div>
         <form action="#" className="user-auth">
            {isAuth ? (
               <>
                  <button
                     className="user-auth__button"
                     onClick={(e) => handleCreateIssueButton(e)}
                  >
                     Create Issue
                  </button>
                  <button
                     className="user-auth__button"
                     onClick={(e) => handleLogout(e)}
                  >
                     Logout
                  </button>
               </>
            ) : (
               <>
                  <button
                     className="user-auth__button"
                     onClick={(e) => handleLoginButton(e)}
                  >
                     Login
                  </button>
                  <button
                     className="user-auth__button"
                     onClick={(e) => handleSignupButton(e)}
                  >
                     Signup
                  </button>
               </>
            )}
         </form>
      </header>
   );
};

export default Header;
