import React, { useState } from "react";
import Icon from "../../components/Icons";
import axios from "axios";

const IssueForm = (props) => {
   const [credentials, setCredetials] = useState({
      title: "",
      content: ""
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
      const user = JSON.parse(localStorage.getItem("userData"));
      formData.append("creator", user._id);
      axios
         .post("http://localhost:4001/api/issues/add", formData)
         .then((response) => {
            const output = response.data;
            console.log(output);
            switch (response.status) {
               case 200:
                  props.handleIssues(output.issues);
                  handleClearField();
                  props.handleCreateIssuePopup();
                  break;
               default:
                  showNotification("Err! Try Again");
            }
         })
         .catch((error) => {
            console.log(error);
            showNotification("Error! Try Again");
         });
   };
   return (
      <div className="add-issue-box">
         <form action="#" onSubmit={handleSubmit} className="add-issue-form">
            <button
               className="close__button"
               onClick={(e) => props.handleCreateIssuePopup(e)}
            >
               <Icon iconName="cross" styleName="close__icon" />
            </button>
            <h3>Create Issue...</h3>
            <input
               type="text"
               placeholder="Title"
               className="signup-form__input"
               name="title"
               value={credentials.title}
               onChange={handleChange}
            />
            <textarea
               placeholder="Content"
               className="signup-form__input"
               rows="6"
               name="content"
               value={credentials.content}
               onChange={handleChange}
            ></textarea>
            <button className="signup-form__button">Create Issue</button>
            {notifier.isVisible ? (
               <span className="notification">{notifier.text}</span>
            ) : (
               <></>
            )}
         </form>
      </div>
   );
};

export default IssueForm;
