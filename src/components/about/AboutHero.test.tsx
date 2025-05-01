import { render, screen } from '@testing-library/react';
import AboutHero from './AboutHero';
import '@testing-library/jest-dom';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        aboutTitle: 'About Me',
        aboutIntro: 'Hello! I\'m Mohammed...',
        aboutBio: 'With over 5 years of experience...',
        contactMe: 'Contact Me',
        contactMeAria: 'Get in touch with me',
        downloadCV: 'Download CV',
        downloadCVAria: 'Download my curriculum vitae',
        scrollForMore: 'Scroll for more',
        aboutMe: 'About Me'
      };
      return translations[key] || key;
    }
  })
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/en/about',
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('AboutHero Component', () => {
  it('renders the hero section with title and content', () => {
    render(<AboutHero />);
    
    // Check if title is rendered
    expect(screen.getByText('About Me')).toBeInTheDocument();
    
    // Check if intro text is rendered
    expect(screen.getByText('Hello! I\'m Mohammed...')).toBeInTheDocument();
    
    // Check if bio text is rendered
    expect(screen.getByText('With over 5 years of experience...')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
    expect(screen.getByText('Download CV')).toBeInTheDocument();
    
    // Check if scroll indicator is rendered
    expect(screen.getByText('Scroll for more')).toBeInTheDocument();
  });

  it('renders the profile image with correct alt text', () => {
    render(<AboutHero />);
    
    const profileImage = screen.getByAltText('About Me');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src');
  });

  it('renders buttons with correct aria labels', () => {
    render(<AboutHero />);
    
    const contactButton = screen.getByLabelText('Get in touch with me');
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveAttribute('href', '/en/contact');
    
    const downloadButton = screen.getByLabelText('Download my curriculum vitae');
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('href', '/assets/cv.pdf');
    expect(downloadButton).toHaveAttribute('download');
  });
});
