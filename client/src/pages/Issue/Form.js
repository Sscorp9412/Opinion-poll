const IssueForm = () => {
   return (
      <div className="add-issue-box">
         <form action="#" className="add-issue-form">
            <h3>Create Issue...</h3>
            <input type="text" placeholder="Title" className="signup-form__input" />
            <textarea
               name=""
               id=""
               placeholder="Content"
               className="signup-form__input"
               rows="6"
            ></textarea>
            <button className="signup-form__button">Create Issue</button>
         </form>
      </div>
   );
};

export default IssueForm
