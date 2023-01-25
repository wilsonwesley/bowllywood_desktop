import './SearchBar.scss';

const SearchBar = () => {
    return (
        <>
            <input 
            type="search" 
            name="search" 
            placeholder='Barre de recherche' 
            className='searchBar'/>
        </>
    );
}

export default SearchBar;