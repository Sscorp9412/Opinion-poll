import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../utilities/authContext";

const Header = (props) => {
   const { isAuth } = useContext(AuthContext);
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
                  <Link to="/create-issue" className="router-link">
                     <button type="button" className="user-auth__button">
                        Create Issue
                     </button>
                  </Link>
                  <Link to="/logout" className="router-link">
                     <button
                        type="button"
                        className="user-auth__button"
                        // onClick={(e) => handleLogout(e)}
                     >
                        Logout
                     </button>
                  </Link>
               </>
            ) : (
               <>
                  <Link to="/login" className="router-link">
                     <button type="button" className="user-auth__button">
                        Login
                     </button>
                  </Link>
                  <Link to="signup" className="router-link">
                     <button type="button" className="user-auth__button">
                        Signup
                     </button>
                  </Link>
               </>
            )}
         </form>
      </header>
   );
};

export default Header;
