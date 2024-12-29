import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import UserList from "../components/UserList";
import UserDetails from "../components/UserDetails";
import { useDispatch } from "react-redux";
import {
  setLoading,
  setError,
  setUsers,
  setUserCount,
} from "../redux/slices/userSlice";
import axios from "axios";

const USER_API_URL = 'https://dummyjson.com/users';

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get(`${USER_API_URL}?limit=30&skip=${page*30}`);
        if (response?.data && response?.data?.users) {
          dispatch(setUsers(response.data.users));
          dispatch(setUserCount(response.data.total))
        } else {
          dispatch(setError("No users found."));
        }
      } catch (err: unknown) {
        dispatch(setError(`Failed to fetch users. , ${err}`));
      }
    };

    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Stack px={3} py={2} height={"100vh"}>
      <Typography variant="h4" gutterBottom alignSelf={"center"}>
        User Dashboard
      </Typography>
      <Stack  direction={{ xs: 'column', md: 'column', lg: 'row' }}  gap={2}>
        <UserList onPageChange={(page: number) => setPage(page)}/>
        <UserDetails />
      </Stack>
    </Stack>
  );
};

export default UserDashboard;
