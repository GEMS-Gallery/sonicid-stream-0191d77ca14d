import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { backend } from '../../declarations/backend';

interface User {
  id: string;
  username: string;
  createdAt: bigint;
}

const Profile: React.FC = () => {
  const { principal } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (principal) {
        try {
          const userData = await backend.getUser(principal);
          if (userData) {
            setUser(userData);
            setUsername(userData.username);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [principal]);

  const handleUpdateUsername = async () => {
    if (username.trim() === '') return;
    setLoading(true);
    try {
      const result = await backend.updateUser(username);
      if ('ok' in result) {
        setUser(result.ok);
      } else {
        console.error('Error updating username:', result.err);
      }
    } catch (error) {
      console.error('Error updating username:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        User ID: {user.id}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Created At: {new Date(Number(user.createdAt) / 1000000).toLocaleString()}
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateUsername}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Update Username'}
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
