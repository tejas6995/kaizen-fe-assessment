import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
  Stack,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStatus,
  selectUser,
  selectUserCount,
  selectUserList,
  User,
} from "../redux/slices/userSlice";
import SearchBar from "./SearchBar";
import UserCard from "./UserCard";

const FAILED = "failed";
const LOADING = "loading";

const UserList: React.FC<{onPageChange: (page: number) => void}> = ({onPageChange}) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUserList);
  const status = useSelector(selectStatus);
  const total = useSelector(selectUserCount);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = React.useState(1);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onPageChange(value)
  };

  const filteredUsers = users.filter(
    (user: User) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserClick = (user: User) => {
    dispatch(selectUser(user));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (users?.length) {
      dispatch(selectUser(users?.[0]));
    }
  }, [dispatch, users]);

  return (
    <Box sx={{ width: { xs: "100%", md: "100%", lg: "70%" } }}>
      <Typography variant="h6" gutterBottom>
        Users List
      </Typography>
      <Stack gap={1}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        {total > 0 && <Pagination count={Math.floor(total/30)} page={page} onChange={handleChange} />}
        </Stack>
        {status === LOADING ? (
        <Grid container spacing={2} px={1} data-testid="loader">
          {Array.from({ length: 9 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={118} />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Grid>
          ))}
        </Grid>
      ) : status === FAILED || filteredUsers?.length === 0 ? (
        <Card>
          <CardContent>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body1" color="text.secondary">
                No users found
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        // <Stack gap={1}>
        //   <SearchBar
        //     searchQuery={searchQuery}
        //     onSearchChange={handleSearchChange}
        //   />
          <Grid
            container
            spacing={2}
            sx={{ overflowY: "auto" }}
            px={1}
            pb={2}
            maxHeight={"78vh"}
          >
            {filteredUsers?.map((user: User) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <UserCard user={user} onClick={() => handleUserClick(user)} />
              </Grid>
            ))}
          </Grid>
        // </Stack>
      )}
      </Stack>

      
    </Box>
  );
};

export default UserList;
