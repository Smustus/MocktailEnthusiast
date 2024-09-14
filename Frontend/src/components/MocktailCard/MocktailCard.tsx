import './MocktailCard.css';
import { Mocktail } from '../../utilities/types';

interface MocktailCardProps {
  mocktailData: Mocktail,
  addMocktail?: () => void,
  removeMocktail?: () => void,
  changeMocktailStatus?: () => void,
  completed?: boolean,
}

const MocktailCard = ({mocktailData, addMocktail, removeMocktail, changeMocktailStatus, completed}: MocktailCardProps) => {

  const {idDrink, strDrink, strDrinkThumb} = mocktailData;

  return (
    <article data-iddrink={idDrink} className='mocktailCard'  >
      <section className={`mocktailCard_info ${completed ? 'completed' : ''}`} onClick={changeMocktailStatus}>
        <h3>{strDrink}</h3>
        <img src={strDrinkThumb} alt={strDrink} />
      </section>
      <section className="mocktailCard_btns">
        {
          addMocktail && <button onClick={addMocktail}>Add</button>
        }
        {
          removeMocktail && <button onClick={removeMocktail}>Remove</button>
        }
      </section>
    </article>
  )
}

export default MocktailCard;