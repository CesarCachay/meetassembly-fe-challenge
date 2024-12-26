import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/EmptyState';

describe('EmptyState component', () => {
  test('renders default text', () => {
    render(<EmptyState />);
    expect(screen.getByText('No photos found')).toBeInTheDocument();
    expect(screen.getByText(/Try a different search/i)).toBeInTheDocument();
  });

  test('can render custom title and description', () => {
    render(
      <EmptyState
        title="Nothing here!"
        description="Please check back soon."
      />,
    );
    expect(screen.getByText('Nothing here!')).toBeInTheDocument();
    expect(screen.getByText('Please check back soon.')).toBeInTheDocument();
  });
});
