import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./utilities/authContext";

import Header from "./pages/Header";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import "./sass/main.scss";

function App() {
   const isUserLoggedIn = () => {
      if (
         localStorage.getItem("userData") &&
         localStorage.getItem("accessToken")
      )
         return true;
      else return false;
   };
   const [isAuth, setAuth] = useState(isUserLoggedIn());
   const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
   const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
   const [isCreateIssuePopupOpen, setCreateIssuePopupOpen] = useState(false);

   const handleAuth = () => setAuth(!isAuth);
   const handleLoginPopup = () => setLoginPopupOpen(!isLoginPopupOpen);
   const handleSignupPopup = () => setSignupPopupOpen(!isSignupPopupOpen);
   const handleCreateIssuePopup = () => {
      return setCreateIssuePopupOpen(!isCreateIssuePopupOpen);
   };
   return (
      <AuthContext.Provider value={{ isAuth: isAuth, handleAuth: handleAuth }}>
         <BrowserRouter>
            <Header
               handleLoginPopup={handleLoginPopup}
               handleSignupPopup={handleSignupPopup}
               handleCreateIssuePopup={handleCreateIssuePopup}
            />
            <Main
               isLoginPopupOpen={isLoginPopupOpen}
               isSignupPopupOpen={isSignupPopupOpen}
               isCreateIssuePopupOpen={isCreateIssuePopupOpen}
               handleLoginPopup={handleLoginPopup}
               handleSignupPopup={handleSignupPopup}
               handleCreateIssuePopup={handleCreateIssuePopup}
            />
            <Footer />
         </BrowserRouter>
      </AuthContext.Provider>
   );
}

export default App;
