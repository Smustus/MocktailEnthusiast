import React, { Dispatch, SetStateAction } from 'react'
import './SearchInput.css'
import { Mocktail } from '../../utilities/types';

interface SearchFormProps {
  setSearchResults: Dispatch<SetStateAction<Mocktail[]>>,
  mocktailList: Mocktail[]
}

const Search: React.FC<SearchFormProps> = ({setSearchResults, mocktailList}) => {

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } =  e.target;   

    const searchResults = mocktailList.filter((mocktail) => {
      return mocktail.strDrink.toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(searchResults);
  };

  return (
    <section>
        <input type='text' id='search' name='search' placeholder='Search drink' autoComplete="off" onChange={handleInputChange} />
    </section>
  )
}

export default Search