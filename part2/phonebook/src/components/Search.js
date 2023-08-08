const Search = ({ filterValue, onFilterChange }) => (
    <div>
        Filter shown with <input value={filterValue} onChange={onFilterChange} />
    </div>
);

export default Search;