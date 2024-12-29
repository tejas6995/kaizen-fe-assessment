import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, expect, it, vi } from 'vitest';

describe('SearchBar Component', () => {
  it('should render the search bar with the correct initial value', () => {
    const searchQuery = 'John';
    const mockOnSearchChange = vi.fn();

    render(<SearchBar searchQuery={searchQuery} onSearchChange={mockOnSearchChange} />);

    const inputElement = screen.getByLabelText(/Search by name/i);
    expect(inputElement).toHaveValue(searchQuery);
  });

  it('should call onSearchChange when the input value changes', () => {
    const mockOnSearchChange = vi.fn();

    render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);

    const inputElement = screen.getByLabelText(/Search by name/i);
    fireEvent.change(inputElement, { target: { value: 'Jane' } });

    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
  });
});
