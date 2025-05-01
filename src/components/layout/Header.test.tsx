import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from 'next-themes';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/en',
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (key === 'logoAria') return 'Mohammed\'s Portfolio - Home';
      if (key === 'openMenu') return 'Open menu';
      if (key === 'closeMenu') return 'Close menu';
      if (key.startsWith('nav')) return key;
      return key;
    },
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
      button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
      span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useReducedMotion: () => false,
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock IntersectionObserver
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('renders the logo and navigation links', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Check if logo is rendered
    expect(screen.getByLabelText("Mohammed's Portfolio - Home")).toBeInTheDocument();

    // Check if navigation links are rendered
    expect(screen.getByText('navHome')).toBeInTheDocument();
    expect(screen.getByText('navAbout')).toBeInTheDocument();
    expect(screen.getByText('navServices')).toBeInTheDocument();
    expect(screen.getByText('navProjects')).toBeInTheDocument();
    expect(screen.getByText('navBlog')).toBeInTheDocument();
    expect(screen.getByText('navContact')).toBeInTheDocument();
  });

  it('renders language switcher with correct options', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    // Check if language options are rendered
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('AR')).toBeInTheDocument();
  });
});