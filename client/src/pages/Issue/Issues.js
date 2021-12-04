import React from "react";
import Issue from './Issue';

const Issues = ({issues}) => {
   return (
      <ul className="issue-list">
         {issues.map((issue, index) => {
            return <Issue key={index} hash={index + 1} issue={issue} />;
         })}
      </ul>
   );
};

export default Issues
