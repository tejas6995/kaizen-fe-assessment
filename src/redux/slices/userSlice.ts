import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
    department: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      country: string;
      coordinates: { lat: string; lon: string };
    };
  };
}

export interface UsersState {
  userList: User[];
  totalUsers: number;
  selectedUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  userList: [],
  totalUsers: 0,
  selectedUser: null,
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setUserCount: (state, action: PayloadAction<number>) => {
      state.totalUsers = action.payload;
    },
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setUsers, selectUser,setUserCount, setLoading, setError } =
  usersSlice.actions;

export const selectUserList = (state: RootState) => state.users.userList;
export const selectUserCount = (state: RootState) => state.users.totalUsers;
export const selectSelectedUser = (state: RootState) =>
  state.users.selectedUser;
export const selectError = (state: RootState) => state.users.error;
export const selectStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
