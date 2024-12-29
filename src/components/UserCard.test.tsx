import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserCard from './UserCard';
import usersReducer, { UsersState } from '../redux/slices/userSlice'; 
import { describe, expect, it, Mock, vi } from 'vitest';

const mockUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  company: {
    name: 'Example Corp',
    department: 'Engineering',
    title: 'Software Engineer',
    address: {
      address: '123 Main St',
      city: 'Cityville',
      state: 'State',
      stateCode: 'ST',
      postalCode: '12345',
      country: 'Country',
      coordinates: { lat: '123', lon: '456' },
    },
  },
};

  const renderWithStore = (initialState: { users: UsersState }, handleClick: Mock) => {
    const store = configureStore({
      reducer: { users: usersReducer },
      preloadedState: initialState,
    });
    return render(
      <Provider store={store}>
         <UserCard user={mockUser} onClick={handleClick} />
      </Provider>
    );
  };
  

describe('UserCard Component', () => {

  it('should render the UserCard with the correct user data', () => {
    const handleClick = vi.fn();
    renderWithStore({
      users: {
        userList: [mockUser],
        totalUsers: 1,
        status: "succeeded",
        selectedUser: mockUser,
        error: null,
      }
    }, handleClick);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('Example Corp')).toBeInTheDocument();
  });

  it('should call onClick when the card is clicked', () => {
    const handleClick = vi.fn();

    renderWithStore({
      users: {
        userList: [mockUser],
        totalUsers: 1,
        status: "succeeded",
        selectedUser: mockUser,
        error: null,
      }
    }, handleClick);

    const userCard = screen.getByText('John Doe').closest('div');
    if (userCard) {
      fireEvent.click(userCard);
    }

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockUser);
  });

  it('should trigger onClick with the correct user when clicked', () => {
    const handleClick = vi.fn();

    renderWithStore({
      users: {
        userList: [mockUser],
        totalUsers: 1,
        status: "succeeded",
        selectedUser: mockUser,
        error: null,
      }
    }, handleClick);

    const userCard = screen.getByText('John Doe').closest('div');
    if (userCard) {
      fireEvent.click(userCard);
    }

    expect(handleClick).toHaveBeenCalledTimes(1); 
    expect(handleClick).toHaveBeenCalledWith(mockUser);
  });
});
