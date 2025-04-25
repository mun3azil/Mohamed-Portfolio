import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from '@/context/ThemeContext';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders the site title', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const siteTitle = screen.getByText(/Mohammad/i);
    expect(siteTitle).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThan(0);
  });
});