import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Medimate landing screen', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /🏥 Medimate/i });
  expect(headingElement).toBeInTheDocument();
});
