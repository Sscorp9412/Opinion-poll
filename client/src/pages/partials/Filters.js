const Filter = () => {
   return (
      <div className="filters-box">
         <ul className="filters-list">
            <li className="filters-list__filter">
               <a href="#top">Featured</a>
            </li>
            <li className="filters-list__filter">
               <a href="#top">Newest</a>
            </li>
            <li className="filters-list__filter">
               <a href="#top">Oldest</a>
            </li>
            <li className="filters-list__filter">
               <a href="#top">Top</a>
            </li>
         </ul>
      </div>
   );
};

export default Filter;
