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
   return (
      <>
         <main className="content">
            <div className="settings">
               <Search />
               <Filter />
            </div>
            <div className="issue-box">
               <ul className="issue-list">
                  <Issue
                     hash={1}
                     title="Hot Sun"
                     content="Is Sun is Hot?"
                     likes={10}
                     dislikes={12}
                     response="dislike"
                  />
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
            <CreateIssue handleCreateIssuePopup={props.CreateIssuePopup} />
         ) : (
            <></>
         )}
      </>
   );
};

export default Main;
