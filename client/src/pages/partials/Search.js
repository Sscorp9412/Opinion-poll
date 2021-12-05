import React, { useState } from "react";
import Icon from "../../components/Icons";

const Search = (props) => {
   const [search, setSearch] = useState("");
   const handleSearchEvent = (e) => {
      const val = e.target.value;
      setSearch(val);
      if (val.length > 0) {
         const updatedIssues = props.issuesHistory.filter(
            (each) =>
               each.title.toLowerCase().includes(val) ||
               each.content.toLowerCase().includes(val)
         );
         console.log(updatedIssues);
         props.handleIssues(updatedIssues);
      } else {
         props.handleIssues(props.issuesHistory);
      }
   };
   return (
      <form action="#" className="search">
         <input
            type="text"
            className="search__input"
            placeholder="Search your Issue"
            value={search}
            onChange={(e) => handleSearchEvent(e)}
         />
         <button className="search__button">
            <Icon iconName="magnifying-glass" styleName="search__icon" />
         </button>
      </form>
   );
};

export default Search;
