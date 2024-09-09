import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Home from './components/Home';
import Library from './components/Library';
import NowPlaying from './components/NowPlaying';
import Profile from './components/Profile';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954',
    },
    background: {
      default: '#191414',
      paper: '#121212',
    },
  },
});

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </ThemeProvider>
  );
};

export default App;
