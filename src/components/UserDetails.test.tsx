import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import usersReducer, { UsersState } from "../redux/slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import UserDetails from "./UserDetails";

const renderWithStore = (initialState: { users: UsersState }) => {
  const store = configureStore({
    reducer: { users: usersReducer },
    preloadedState: initialState,
  });
  return render(
    <Provider store={store}>
      <UserDetails />
    </Provider>
  );
};

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

describe("UserDetails Component", () => {
  it('should show skeleton loader when status is "loading"', () => {
    renderWithStore({
      users: {
        userList: [],
        totalUsers: 0,
        status: "loading",
        selectedUser: null,
        error: null,
      },
    });

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it('should show error message when status is "failed"', () => {
    renderWithStore({
      users: {
        userList: [],
        totalUsers: 0,
        status: "failed",
        selectedUser: null,
        error: "Failed to fetch users",
      },
    });

    expect(screen.getByText("No data to show")).toBeInTheDocument();
  });

  it('should render the user details when status is "succeeded"', () => {
    renderWithStore({
      users: {
        userList: [mockUser],
        totalUsers: 1,
        status: "succeeded",
        selectedUser: mockUser,
        error: null,
      },
    });

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
    expect(screen.getByText(/Example Corp/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/Cityville/i)).toBeInTheDocument();
    expect(screen.getByText(/12345/i)).toBeInTheDocument();
    expect(screen.getByText(/Lat: 123, Lon: 456/i)).toBeInTheDocument();
  });
});
