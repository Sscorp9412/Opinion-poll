import React, { useState, useContext } from "react";
import Icon from "../../components/Icons";
import axios from "axios";
import AuthContext from "../../utilities/authContext";

const Signup = (props) => {
   const { handleAuth } = useContext(AuthContext);
   const [credentials, setCredetials] = useState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
   });

   const [notifier, setNotifier] = useState({
      isVisible: false,
      text: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setCredetials({ ...credentials, [name]: value });
   };

   const handleClearField = () => {
      for (let each in credentials) {
         setCredetials({ ...credentials, [each]: "" });
      }
   };

   const showNotification = (message) => {
      setNotifier({ isVisible: true, text: message });
      setTimeout(() => {
         setNotifier({ ...notifier, isVisible: false });
      }, 2000);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      for (let each in credentials) {
         formData.append(each, credentials[each]);
      }
      axios
         .post("http://localhost:4001/api/auth/login", formData)
         .then((response) => {
            const output = response.data;
            switch (response.status) {
               case 200:
                  localStorage.setItem("accessToken", output.token);
                  localStorage.setItem("userData", JSON.stringify(output.user));
                  handleClearField();
                  showNotification("Login Successfully");
                  handleAuth();
                  props.handleLoginPopup();
                  break;
               default:
                  showNotification("Error! Try Again");
            }
         })
         .catch((error) => {
            showNotification("Error! Try Again");
         });
   };
   return (
      <div className="signup-box">
         <form action="#" className="signup-form">
            <button
               className="close__button"
               onClick={(e) => props.handleSignupPopup(e)}
            >
               <Icon iconName="cross" styleName="close__icon" />
            </button>
            <h3>Sign in Here...</h3>
            <input
               type="text"
               placeholder="First Name"
               className="signup-form__input"
            />
            <input
               type="text"
               placeholder="Last name"
               className="signup-form__input"
            />
            <input
               type="text"
               placeholder="Username"
               className="signup-form__input"
            />
            <input
               type="text"
               placeholder="Email"
               className="signup-form__input"
            />
            <input
               type="text"
               placeholder="password"
               className="signup-form__input"
            />
            <button className="signup-form__button">sign up</button>
            {notifier.isVisible ? (
               <span className="notification">{notifier.text}</span>
            ) : (
               <></>
            )}
         </form>
      </div>
   );
};

export default Signup;
