import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Music Streaming App
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={login}
          sx={{ mt: 3, mb: 2 }}
        >
          Login with Internet Identity
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
