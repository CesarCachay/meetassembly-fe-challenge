import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import toast from 'react-hot-toast';

import ImageDetail from '@/components/ImageDetail';
import { useFavorites } from '@/hooks/useFavorites';
import { PexelsPhotoType } from '@/types/pexels';

const mockPhoto: PexelsPhotoType = {
  id: 1234,
  photographer: 'John Doe',
  photographer_url: 'https://www.pexels.com/@john',
  url: 'https://example.com/image.jpg',
  src: {
    original: '/some-original.jpg',
    large2x: '/large2x.jpg',
    large: '/large.jpg',
    medium: '/medium.jpg',
    small: '/small.jpg',
    portrait: '/portrait.jpg',
    landscape: '/landscape.jpg',
    tiny: '/tiny.jpg',
  },
  width: 800,
  height: 600,
  alt: 'A beautiful test photo',
};

jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  handleDownload: jest.fn(),
  cn: jest.fn((...args) => args.join(' ')),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe('ImageDetail component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders photographer name and photo', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: () => false,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });

    render(<ImageDetail photo={mockPhoto} />);

    expect(screen.getByText('Picture by:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('add to favorites when not favorite', async () => {
    const mockAddFavorite = jest.fn();
    const mockRemoveFavorite = jest.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: () => false,
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    render(<ImageDetail photo={mockPhoto} />);

    const user = userEvent.setup();
    const favBtn = screen.getByRole('button', { name: /add to favorites/i });
    expect(favBtn).toBeInTheDocument();

    await user.click(favBtn);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockPhoto);
    expect(toast.success).toHaveBeenCalledWith('Added to favorites!');
  });

  test('remove from favorites when already favorite', async () => {
    const mockAddFavorite = jest.fn();
    const mockRemoveFavorite = jest.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: () => true,
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    render(<ImageDetail photo={mockPhoto} />);

    const user = userEvent.setup();
    const removeFavBtn = screen.getByRole('button', {
      name: /remove favorite/i,
    });
    expect(removeFavBtn).toBeInTheDocument();

    await user.click(removeFavBtn);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockPhoto.id);
    expect(toast.success).toHaveBeenCalledWith('Removed from favorites!');
  });
});
