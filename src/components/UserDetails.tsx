import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Skeleton,
  Box,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectSelectedUser, selectStatus } from "../redux/slices/userSlice";

const FAILED = "failed";
const LOADING = 'loading';

const UserDetails: React.FC = () => {
  const user = useSelector(selectSelectedUser);
  const status = useSelector(selectStatus);

  const { address } = user?.company || {};

  const noDataFound = () => !user || status === FAILED

  return (
    <Stack sx={{width: {xs: '100%', md: '100%', lg: '30%'}}}>
      <Typography variant="h6" gutterBottom>
        Users Details
      </Typography>
      {status === LOADING ? (
        <Card data-testid="loader">
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              <Skeleton width="40%" />
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> <Skeleton width="60%" />
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Phone:</strong> <Skeleton width="60%" />
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Company:</strong> <Skeleton width="80%" />
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Address:</strong> <Skeleton width="80%" />
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Department:</strong> <Skeleton width="80%" />
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Title:</strong> <Skeleton width="80%" />
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent sx={{height: noDataFound() ? '10rem' : 'auto'}}>
            {noDataFound() ? (
              <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
                <Typography variant="body1" color="text.secondary">
                  No data to show
                </Typography>
              </Stack>
            ) : (
              user && <>
              <Typography variant="h5" component="div" gutterBottom color="primary">
                {user.firstName ?? "No First Name"}{" "}
                {user.lastName ?? "No Last Name"}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Email:</strong> {user.email ?? "No Email"}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Phone:</strong> {user.phone ?? "No Phone"}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Company:</strong> {user.company?.name ?? "No Company"}
              </Typography>
              {address && (
                <Box>
                  <Typography variant="body1" paragraph>
                    <strong>Address:</strong>{" "}
                    {address.address ?? "No Address"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>City:</strong> {address.city ?? "No City"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>State:</strong> {address.state ?? "No State"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Postal Code:</strong>{" "}
                    {address.postalCode ?? "No Postal Code"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Country:</strong>{" "}
                    {address.country ?? "No Country"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>State Code:</strong>{" "}
                    {address.stateCode ?? "No State Code"}
                  </Typography>
                  {address.coordinates && (
                    <>
                      <Typography variant="body1" paragraph>
                        <strong>Coordinates:</strong>{" "}
                        {`Lat: ${address.coordinates?.lat ?? ''}, Lon: ${address.coordinates?.lon ?? ''}`}
                      </Typography>
                    </>
                  )}
                </Box>
              )}
              <Typography variant="body1" paragraph>
                <strong>Department:</strong>{" "}
                {user.company?.department ?? "No Department"}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Title:</strong> {user.company?.title ?? "No Title"}
              </Typography>
            </>
            )}
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default UserDetails;
