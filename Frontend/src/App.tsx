import { SetStateAction, useEffect, useState } from 'react'
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
  const [activeComponent, setActiveComponent] = useState<SetStateAction<string>>('explore');

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

  const removeMocktail = (id: string, component: string) => {    
    if(component === 'list'){
      setSavedMocktailList(savedMocktailList.filter((mocktail) => {
        return mocktail.idDrink !== id
        })
      );
    }
    if(component === 'completed'){
      setCompletedCocktails(completedCocktails.filter((mocktail) => {
        return mocktail.idDrink !== id
        })
      );
    }
    
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

  const clearAll = (component: string) => {
    if(component === 'list'){
      setSavedMocktailList([])
    }
    if(component === 'completed'){
      setCompletedCocktails([]);
    }
  }


  return (
    <>
      <h1>Mark's To-drink list</h1>
      
      {
        activeComponent === 'list' || 'explore' ? <Search setSearchResults={setSearchResults} mocktailList={mocktailList} /> : ""
      }

      <nav className='navigation'>   
        <button onClick={() => setActiveComponent('explore')} className={activeComponent === 'explore' ? 'active' : ''}>Explore</button>
        <button onClick={() => setActiveComponent('list')} className={activeComponent === 'list' ? 'active' : ''}>Todo-list</button>
        <button onClick={() => setActiveComponent('completed')} className={activeComponent === 'completed' ? 'active' : ''}>Completed</button>
      </nav>
        {
          (activeComponent === 'list' || activeComponent === 'completed') && <button onClick={() => clearAll(activeComponent)}>Clear</button>
        }
      <main className='main'>
        <section className='drinkList'>
        {
          activeComponent === 'explore' &&
          (
            searchResults.length > 0 ? searchResults.map((mocktail) => (
              <MocktailCard 
                key={mocktail.idDrink} 
                mocktailData={mocktail} 
                addMocktail={() =>  addMocktail(mocktail.idDrink)}
                completed={toggleCompleted(mocktail.idDrink)}
              />
            )) 
          :
            mocktailList.map((mocktail) => (
              <MocktailCard 
                key={mocktail.idDrink} 
                mocktailData={mocktail} 
                addMocktail={() =>  addMocktail(mocktail.idDrink)}
                completed={toggleCompleted(mocktail.idDrink)}
              />
            ))
          )
        }
        {
          activeComponent === 'list' && (
            savedMocktailList.map((mocktail) => (
              <MocktailCard 
                key={mocktail.idDrink} 
                mocktailData={mocktail} 
                removeMocktail={() => removeMocktail(mocktail.idDrink, activeComponent)} 
                changeMocktailStatus={() => changeMocktailStatus(mocktail.idDrink)}
                completed={toggleCompleted(mocktail.idDrink)}
              />
            ))
          )
        }
        {
          activeComponent === 'completed' && (
            completedCocktails.map((mocktail) => (
              <MocktailCard 
                key={mocktail.idDrink} 
                mocktailData={mocktail} 
                removeMocktail={() => removeMocktail(mocktail.idDrink, activeComponent)} 
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
