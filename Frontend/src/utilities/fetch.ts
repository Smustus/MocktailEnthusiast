export async function fetchMocktails(){
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');    
    if(!response.ok){
      throw new Error('Problems with the response');
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Couldnt fetch mocktaildata' + error);
  }
}