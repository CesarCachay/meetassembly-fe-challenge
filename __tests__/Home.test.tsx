import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import { useFetchPexels } from '@/hooks/useFetchPexels';
import toast from 'react-hot-toast';

jest.mock('@/hooks/useFetchPexels');
jest.mock('react-hot-toast', () => ({
  ...jest.requireActual('react-hot-toast'),
  error: jest.fn(),
}));

describe('Home component', () => {
  const mockUseFetchPexels = useFetchPexels as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Set default mock return value
    mockUseFetchPexels.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      hasMorePhotos: true,
      fetchNextPage: jest.fn(),
      hasFetchedOnce: false,
    });
  });

  it('renders the input with the default value "nature"', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(
      /search for categories/i,
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('nature');
  });

  it('submits the form and calls useFetchPexels with the new value', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(
      /search for categories/i,
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'cities' } });
    fireEvent.click(button);

    expect(mockUseFetchPexels).toHaveBeenLastCalledWith('cities', 12);
  });

  it('shows an error message if `error` is returned by useFetchPexels', () => {
    mockUseFetchPexels.mockReturnValue({
      data: [],
      loading: false,
      error: 'Something went wrong',
      hasMorePhotos: false,
      fetchNextPage: jest.fn(),
      hasFetchedOnce: true,
    });

    render(<Home />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows a toast error if the input is empty on submit', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(
      /search for categories/i,
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    // Emulate empty string
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(toast.error).toHaveBeenCalledWith(
      'Please try different search or do not leave it empty.',
    );
  });
});
