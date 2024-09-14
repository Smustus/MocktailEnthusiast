
import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

describe('App component', () => {

  test('correct header is rendered', () => { 
    render(<App />)
    expect(screen.getByText("Mark's To-drink list")).toBeInTheDocument();
  })

  test('fetches and renders mocktail list', async () => {
    render(<App />);
    expect(await screen.findByText('Afterglow')).toBeInTheDocument();
    expect(await screen.findByText('Alice Cocktail')).toBeInTheDocument();
  });
  
  test('check if searchbox is rendered', () => { 
    render(<App />)
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  })

  test('assert if user can properly search', async () => { 
    render(<App />)
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: 'after' } });
    expect(await screen.findByText('Afterglow')).toBeInTheDocument();
  })

 



});
