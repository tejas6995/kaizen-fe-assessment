import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import UserList from "./UserList";
import { User, UsersState } from "../redux/slices/userSlice";
import { describe, expect, it, vi } from "vitest";
import usersReducer from "../redux/slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const renderWithStore = (initialState: {users: UsersState}) => {
  const handleClick = vi.fn();
  const store = configureStore({
    reducer: {users: usersReducer},
    preloadedState: initialState,
  });
  return render(
    <Provider store={store}>
      <UserList onPageChange={handleClick}/>
    </Provider>
  );
};

const mockUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    company: {
      name: "Company A",
      department: "Engineering",
      title: "Developer",
      address: {
        address: "123 Street",
        city: "City",
        state: "State",
        stateCode: "SC",
        postalCode: "12345",
        country: "Country",
        coordinates: { lat: "12.34", lon: "56.78" },
      },
    },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    company: {
      name: "Company B",
      department: "Marketing",
      title: "Manager",
      address: {
        address: "456 Avenue",
        city: "City",
        state: "State",
        stateCode: "SC",
        postalCode: "67890",
        country: "Country",
        coordinates: { lat: "98.76", lon: "54.32" },
      },
    },
  },
];

describe("UserList Component", () => {
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

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it('should render the user list when status is "succeeded"', () => {
    renderWithStore({
      users: {
        userList: mockUsers,
        totalUsers: 2,
        status: "succeeded",
        selectedUser: null,
        error: null,
      },
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("should filter the users based on search query", async () => {
    renderWithStore({
      users: {
        userList: mockUsers,
        totalUsers: 2,
        status: "succeeded",
        selectedUser: null,
        error: null,
      },
    });

    const searchInput = screen.getByLabelText(/search by name/i);
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("should display a no users message when the user list is empty", () => {
    renderWithStore({
      users: {
        userList: [],
        totalUsers: 0,
        status: "succeeded",
        selectedUser: null,
        error: null,
      },
    });

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });
});
