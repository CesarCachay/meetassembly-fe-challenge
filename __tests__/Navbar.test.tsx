import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Navbar', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test('renders "Go to favorites" when pathname is /', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navbar />);

    expect(screen.getByText(/Unplashify/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to favorites/i)).toBeInTheDocument();
  });

  test('renders "Go back" when pathname is /favorites', () => {
    (usePathname as jest.Mock).mockReturnValue('/favorites');
    render(<Navbar />);

    expect(screen.getByText(/Unplashify/i)).toBeInTheDocument();
    expect(screen.getByText(/Go back/i)).toBeInTheDocument();
  });

  test('redirects to home when clicking the logo', () => {
    (usePathname as jest.Mock).mockReturnValue('/favorites');
    render(<Navbar />);

    const logo = screen.getByText(/Unplashify/i);
    logo.click();

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
