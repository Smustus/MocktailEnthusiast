import { render, screen, fireEvent } from '@testing-library/react'
import Search from './SearchInput'
import mocktails from '../../mocks/MocktailMock.json'


describe('SearchInput Component', () => {

  const mocktailList = mocktails;

  test('renders the search input field', () => {
    const setSearchResults = vi.fn();
    render(<Search setSearchResults={setSearchResults} mocktailList={mocktailList} />);

    const searchInput = screen.getByPlaceholderText('Search drink');
    expect(searchInput).toBeInTheDocument();
  });

  test('filters and returns searchResults based on input value', () => {
    const setSearchResults = vi.fn();
    render(<Search setSearchResults={setSearchResults} mocktailList={mocktailList} />);

    const searchInput = screen.getByPlaceholderText('Search drink');
    fireEvent.change(searchInput, { target: { value: 'after' } });

    expect(setSearchResults).toHaveBeenCalledWith([
      { idDrink: '12560', strDrink: 'Afterglow', strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/vuquyv1468876052.jpg" }
    ]);
  });

  test('returns all results when input is cleared', () => {
    const setSearchResults = vi.fn();
    render(<Search setSearchResults={setSearchResults} mocktailList={mocktailList} />);

    const searchInput = screen.getByPlaceholderText('Search drink');
    fireEvent.change(searchInput, { target: { value: 'after' } });

    fireEvent.change(searchInput, { target: { value: '' } });

    expect(setSearchResults).toHaveBeenCalledWith(mocktailList);
  });
});