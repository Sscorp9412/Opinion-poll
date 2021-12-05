import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../utilities/authContext";
import axios from "axios";
import Icon from "../../components/Icons";
import store from "../../redux/store";

const Issue = ({ hash, issue }) => {
   const { isAuth } = useContext(AuthContext);
   const [responses, setResponses] = useState({
      userResponse: "",
      likes: 0,
      dislikes: 0
   });

   useEffect(() => {
      if (isAuth) {
         if (issue && issue.opinions && issue.opinions.length > 0) {
            const userId = JSON.parse(localStorage.getItem("userData"))._id;
            console.log(userId);
            const userResponse = issue.opinions.filter(
               (each) => each.userId === userId
            );
            if (userResponse.length > 0) {
               //   console.log("userResponse.set", userResponse)
               setResponses({
                  ...responses,
                  userResponse: userResponse[0].opinion
               });
            }
         }
      } else {
        setResponses({
            ...responses,
            userResponse: ""
         });

      }
      // eslint-disable-next-line
   }, [isAuth]);

   //handle response
   const handleResponse = (response) => {
      // ..do something
      const opinion = {
         userId: JSON.parse(localStorage.getItem("userData"))._id,
         opinion: response
      };
      const formData = new FormData();
      for (let key in opinion) {
         formData.append(key, opinion[key]);
      }
      axios
         .put(
            `http://localhost:4001/api/issues/update/opinion/${issue._id}`,
            formData,
            {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("accessToken")
               }
            }
         )
         .then((response) => {
            if (issue && issue.opinions.length > 0) {
               const userOpinion = issue.opinions.filter(
                  (each) => each.userId === opinion.userId
               );
               if (userOpinion.length > 0) {
                  const updatedOpinions = issue.opinions.map((each) => {
                     if (each.userId === opinion.userId) {
                        if (each.opinion !== opinion.opinion)
                           each.opinion = opinion.opinion;
                     }
                     return each;
                  });
                  //   console.log(updatedOpinions);
                  store.dispatch({
                     type: "EDIT_ISSUE",
                     payloads: {
                        issue: { ...issue, opinions: updatedOpinions }
                     }
                  });
               } else {
                  store.dispatch({
                     type: "EDIT_ISSUE",
                     payloads: {
                        issue: {
                           ...issue,
                           opinions: [...issue.opinions, opinion]
                        }
                     }
                  });
               }
            } else {
               store.dispatch({
                  type: "EDIT_ISSUE",
                  payloads: {
                     issue: {
                        ...issue,
                        opinions: [...issue.opinions, opinion]
                     }
                  }
               });
            }
            setResponses({ ...responses, userResponse: opinion.opinion });
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const formatLikeclassName = () => {
      const plainStyle = "issue__response";
      return isAuth
         ? responses.userResponse === "like"
            ? `${plainStyle} active`
            : `${plainStyle}`
         : `${plainStyle}`;
   };

   // format dislike classNameName
   const formatDislikeclassName = () => {
      const plainStyle = "issue__response";
      return isAuth
         ? responses.userResponse === "dislike"
            ? `${plainStyle} active`
            : `${plainStyle}`
         : `${plainStyle}`;
   };

   // handle Like Count
   const handleOpinionCount = (response) => {
      if (issue && issue.opinions && issue.opinions.length > 0) {
         if (response === "like") {
            const count = issue.opinions.filter(
               (each) => each.opinion === "like"
            );
            return count.length;
         } else {
            const count = issue.opinions.filter(
               (each) => each.opinion === "dislike"
            );
            return count.length;
         }
      } else {
         return 0;
      }
   };

   return (
      <li className="issue">
         <div className="issue__header">
            <h3 className="issue__title">
               <span className="issue__title--hash">#{hash} </span>
               <span className="issue__title--text">{issue.title}</span>
            </h3>
            <button className="issue__edit">
               <Icon iconName="pencil" styleName={"issue__edit-icon"} />
            </button>
         </div>
         <div className="issue__body">
            <p className="issue__content">{issue.content}</p>
            <form action="#" className="issue__response-box">
               <span className="issue__response-count">
                  {handleOpinionCount("like")}
               </span>
               {isAuth ? (
                  <button
                     className={formatLikeclassName()}
                     type="button"
                     onClick={() => handleResponse("like")}
                  >
                     <Icon
                        iconName="thumbs-up"
                        styleName={"issue__response-icon"}
                     />
                     <span className="issue__response-text">Like</span>
                  </button>
               ) : (
                  <Link to="/login" className="router-link">
                     <button className={formatLikeclassName()} type="button">
                        <Icon
                           iconName="thumbs-up"
                           styleName={"issue__response-icon"}
                        />
                        <span className="issue__response-text">Like</span>
                     </button>
                  </Link>
               )}
               <span className="issue__response-count">
                  {handleOpinionCount("dislike")}
               </span>
               {isAuth ? (
                  <button
                     type="button"
                     className={formatDislikeclassName()}
                     onClick={() => handleResponse("dislike")}
                  >
                     <Icon
                        iconName="thumbs-down"
                        styleName={"issue__response-icon"}
                     />
                     <span className="issue_response-text">Dislike</span>
                  </button>
               ) : (
                  <Link to="/login" className="router-link">
                     <button type="button" className={formatDislikeclassName()}>
                        <Icon
                           iconName="thumbs-down"
                           styleName={"issue__response-icon"}
                        />
                        <span className="issue_response-text">Dislike</span>
                     </button>
                  </Link>
               )}
            </form>
         </div>
      </li>
   );
};

export default Issue;
