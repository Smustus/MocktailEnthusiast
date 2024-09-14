import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MocktailCard from './MocktailCard';
import mockMocktailData from '../../mocks/MocktailMock.json'

describe('MocktailCard Component', () => {

  const mockMocktail = mockMocktailData[0];

  test('renders the mocktail name and image', () => {
    render(<MocktailCard mocktailData={mockMocktail} />);

    expect(screen.getByText('Afterglow')).toBeInTheDocument();

    const img = screen.getByAltText('Afterglow');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vuquyv1468876052.jpg');
  });

  test('renders the Add button and calls addMocktail when clicked', () => {
    const addMocktail = vi.fn();
    render(<MocktailCard mocktailData={mockMocktail} addMocktail={addMocktail} />);

    const addButton = screen.getByText('Add');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(addMocktail).toHaveBeenCalledTimes(1);
  });

  test('renders the Remove button and calls removeMocktail when clicked', () => {
    const removeMocktail = vi.fn();
    render(<MocktailCard mocktailData={mockMocktail} removeMocktail={removeMocktail} />);

    const removeButton = screen.getByText('Remove');
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(removeMocktail).toHaveBeenCalledTimes(1);
  });

  test('applies completed class and calls changeMocktailStatus when clicked', () => {
    const changeMocktailStatus = vi.fn();
    render(<MocktailCard mocktailData={mockMocktail} changeMocktailStatus={changeMocktailStatus} completed={true} />);

    const mocktailCardInfo = screen.getByText('Afterglow').closest('section');
    expect(mocktailCardInfo).toHaveClass('completed');

    fireEvent.click(mocktailCardInfo);
    expect(changeMocktailStatus).toHaveBeenCalledTimes(1);
  });

  test('Check if the Add or Remove button are rendered if props are not passed', () => {
    render(<MocktailCard mocktailData={mockMocktail} />);
    expect(screen.queryByText('Add')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove')).not.toBeInTheDocument();
  });
});