import React, {useState} from "react";
import Issue from './Issue';
import store from '../../redux/store';

const Issues = () => {
   const [issues, setIssues] = useState([]);
   store.subscribe(() => {
      setIssues(store.getState().issues);
   })
   
   return (
      <ul className="issue-list">
         {issues.map((issue, index) => {
            return <Issue key={index} hash={index + 1} issue={issue} />;
         })}
      </ul>
   );
};

export default Issues
