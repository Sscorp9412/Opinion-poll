import React from "react";
import Icon from "../../components/Icons";

const Issue = ({ hash, title, content, likes = 0, dislikes = 0, response }) => {
   const formatLikeclassName = () => {
      const plainStyle = "issue__response";
      return response === "like" ? `${plainStyle} active` : `${plainStyle}`;
   };

   // format dislike classNameName
   const formatDislikeclassName = () => {
      const plainStyle = "issue__response";
      return response === "dislike" ? `${plainStyle} active` : `${plainStyle}`;
   };

   const likeclassName = formatLikeclassName();
   const dislikeclassName = formatDislikeclassName();

   return (
      <li className="issue">
         <div className="issue__header">
            <h3 className="issue__title">
               <span className="issue__title--hash">#{hash} </span>
               <span className="issue__title--text">{title}</span>
            </h3>
            <button className="issue__edit">
               <Icon iconName="pencil" styleName={"issue__edit-icon"} />
            </button>
         </div>
         <div className="issue__body">
            <p className="issue__content">{content}</p>
            <form action="#" className="issue__response-box">
               <span className="issue__response-count">{likes}</span>
               <button className={likeclassName}>
                  <Icon
                     iconName="thumbs-up"
                     styleName={"issue__response-icon"}
                  />
                  <span className="issue__response-text">Like</span>
               </button>
               <span className="issue__response-count">{dislikes}</span>
               <button className={dislikeclassName}>
                  <Icon
                     iconName="thumbs-down"
                     styleName={"issue__response-icon"}
                  />
                  <span className="issue_response-text">Dislike</span>
               </button>
            </form>
         </div>
      </li>
   );
};

export default Issue;
