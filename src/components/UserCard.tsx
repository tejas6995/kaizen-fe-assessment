import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { selectSelectedUser, User } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const selectedUser = useSelector(selectSelectedUser);
  return (
    <Card
      onClick={() => onClick(user)}
      sx={{
        cursor: 'pointer',
        borderRadius: 2,
        boxShadow: selectedUser?.id === user.id ? 6 : 1,
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          {`${user?.firstName} ${user?.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.company?.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
