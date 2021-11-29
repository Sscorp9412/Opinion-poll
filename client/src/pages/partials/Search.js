import Icon from "../../components/Icons";

const Search = () => {
   return (
      <form action="#" className="search">
         <input
            type="text"
            className="search__input"
            placeholder="Search your Issue"
         />
         <button className="search__button">
            <Icon iconName="magnifying-glass" styleName="search__icon"/>
         </button>
      </form>
   );
};

export default Search;
