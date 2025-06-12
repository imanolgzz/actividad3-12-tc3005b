import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('agrega nuevo elemento a la lista', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/nuevo artículo/i);
  fireEvent.change(input, { target: { value: 'Cargador' } });

  const boton = screen.getByText(/agregar/i);
  fireEvent.click(boton);

  expect(screen.getByText('Cargador')).toBeInTheDocument();
});
