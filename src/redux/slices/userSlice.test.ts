import {
  setUsers,
  selectUser,
  setLoading,
  setError,
  User,
  UsersState,
} from "./userSlice";
import { expect, test } from "vitest";

import usersReducer from "./userSlice";

const initialState: UsersState = {
  userList: [],
  selectedUser: null,
  status: "idle",
  error: null,
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

test('setUsers should update userList and set status to "succeeded"', () => {
  const action = setUsers(mockUsers);
  const newState = usersReducer(initialState, action);

  expect(newState.userList).toEqual(mockUsers);
  expect(newState.status).toBe("succeeded");
  expect(newState.error).toBeNull();
});

test("selectUser should update selectedUser", () => {
  const action = selectUser(mockUsers[0]);
  const newState = usersReducer(initialState, action);

  expect(newState.selectedUser).toEqual(mockUsers[0]);
});

test('setLoading should set status to "loading"', () => {
  const action = setLoading();
  const newState = usersReducer(initialState, action);

  expect(newState.status).toBe("loading");
});

test('setError should set error message and set status to "failed"', () => {
  const errorMessage = "Error fetching users";
  const action = setError(errorMessage);
  const newState = usersReducer(initialState, action);

  expect(newState.status).toBe("failed");
  expect(newState.error).toBe(errorMessage);
});

test('setUsers with empty list should set userList to empty and status to "succeeded"', () => {
  const action = setUsers([]);
  const newState = usersReducer(initialState, action);

  expect(newState.userList).toEqual([]);
  expect(newState.status).toBe("succeeded");
});

test("selectUser with null should clear selectedUser", () => {
  const action = selectUser(null);
  const newState = usersReducer(initialState, action);

  expect(newState.selectedUser).toBeNull();
});
