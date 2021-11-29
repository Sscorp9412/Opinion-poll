import React, { useState, useContext } from "react";
import Icon from "../../components/Icons";
import axios from "axios";
import AuthContext from "../../utilities/authContext";

const Login = (props) => {
   const { handleAuth } = useContext(AuthContext);
   const [credentials, setCredetials] = useState({ email: "", password: "" });
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
      <div className="login-box">
         <form action="" onSubmit={handleSubmit} className="login-form">
            <button
               className="close__button"
               onClick={(e) => props.handleLoginPopup(e)}
            >
               <Icon iconName="cross" styleName="close__icon" />
            </button>
            <h3>Log in Here...</h3>
            <input
               type="email"
               placeholder="email"
               name="email"
               className="login-form__input"
               value={credentials.email}
               onChange={handleChange}
            />
            <input
               type="password"
               placeholder="password"
               name="password"
               className="login-form__input"
               value={credentials.password}
               onChange={handleChange}
            />
            <button className="login-form__button">Login</button>
            {notifier.isVisible ? (
               <span className="notification">{notifier.text}</span>
            ) : (
               <></>
            )}
         </form>
      </div>
   );
};

export default Login;