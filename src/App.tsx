import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './App.css'
import { fetchMocktails } from './utilities/fetch'
import { Mocktail } from './utilities/types'
import MocktailCard from './components/MocktailCard/MocktailCard'
import Search from './components/Search/SearchInput'


function App() {
  const [mocktailList, setMocktailList] = useState<Mocktail[]>([])
  const [savedMocktailList, setSavedMocktailList] = useState<Mocktail[]>([]);
  const [completedCocktails, setCompletedCocktails] = useState<Mocktail[]>([])
  const [searchResults, setSearchResults] = useState<Mocktail[]>([]);
  const [activeComponent, setActiveComponent] = useState<SetStateAction<string>>('search');

  useEffect(() => {
    console.log(completedCocktails);
    console.log(searchResults);
    console.log(savedMocktailList);
    
  }, [completedCocktails, searchResults, savedMocktailList]);

  useEffect(() => {
    async function mocktails() {
      try {
        const data = await fetchMocktails();
        setMocktailList(data.drinks);
      } catch (error) {
        console.log(error);
      }
    }
    mocktails()
  }, []);

  const toggleActiveComponent = (component: SetStateAction<string>) => {
    setActiveComponent(component);
  }

  const addMocktail = (id: string) => {
    const mocktail = mocktailList.find((mocktail) => {
      return mocktail.idDrink === id
    });
    
    if(mocktail){
      const exists = savedMocktailList.some((saved) => saved.strDrink === mocktail.strDrink);
      if(!exists){
        setSavedMocktailList((prevData) => [...prevData, mocktail]);
      }
    }
  }

  const removeMocktail = (id: string) => {
    mocktailList.filter((mocktail) => {
      return mocktail.idDrink !== id
    });
  }

  const changeMocktailStatus = (id: string) => {
    
    const isCompleted = completedCocktails.some((mocktail) => mocktail.idDrink === id);
    if(isCompleted){
      setCompletedCocktails((prevData) =>
        prevData.filter((mocktail) => mocktail.idDrink !== id)
      );
    } else {
      const mocktail = mocktailList.find((mocktail) => {
        return mocktail.idDrink === id
      });
  
      if(mocktail){
        const exists = completedCocktails.some((saved) => saved.strDrink === mocktail.strDrink);
        if(!exists){
          setCompletedCocktails((prevData) => [...prevData, mocktail]);
        }
      }
    }
  }

  const toggleCompleted = (id: string) => {
    return completedCocktails.some((completedMocktail) => completedMocktail.idDrink === id);
  };


  return (
    <>
      <h1>Mark's To-drink list</h1>
      {
        activeComponent === 'search' ? <Search setSearchResults={setSearchResults} mocktailList={mocktailList} /> : ""
      }
      <button onClick={() => toggleActiveComponent('search')}>Search&Add</button>
      <button onClick={() => toggleActiveComponent('list')}>Todo-list</button>
      
      <main className='main'>
        <section className='drinkList'>
        {
          activeComponent === 'search' ?
          (
            searchResults.length > 0 ? searchResults.map((mocktail) => (
              <MocktailCard 
                key={mocktail.idDrink} 
                mocktailData={mocktail} 
                addMocktail={() =>  addMocktail(mocktail.idDrink)}
                removeMocktail={() => removeMocktail(mocktail.idDrink)} 
                changeMocktailStatus={() => changeMocktailStatus(mocktail.idDrink)}
                completed={toggleCompleted(mocktail.idDrink)}
              />
            )) 
          :
            mocktailList.map((mocktail) => (
              <MocktailCard 
                key={mocktail.idDrink} 
                mocktailData={mocktail} 
                addMocktail={() =>  addMocktail(mocktail.idDrink)}
                removeMocktail={() => removeMocktail(mocktail.idDrink)} 
                changeMocktailStatus={() => changeMocktailStatus(mocktail.idDrink)}
                completed={toggleCompleted(mocktail.idDrink)}
              />
            ))
          ) : (
            savedMocktailList.map((mocktail) => (
              <MocktailCard 
                key={mocktail.idDrink} 
                mocktailData={mocktail} 
                addMocktail={() =>  addMocktail(mocktail.idDrink)}
                removeMocktail={() => removeMocktail(mocktail.idDrink)} 
                changeMocktailStatus={() => changeMocktailStatus(mocktail.idDrink)}
                completed={toggleCompleted(mocktail.idDrink)}
              />
            ))
          )
        }
        </section>
      </main>
      
    </>
  )
}

export default App
