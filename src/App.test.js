import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello React Router v6/i);
  expect(linkElement).toBeInTheDocument();
});
