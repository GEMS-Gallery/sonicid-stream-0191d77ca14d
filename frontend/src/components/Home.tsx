import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { backend } from '../../declarations/backend';

interface Song {
  id: bigint;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const allSongs = await backend.getAllSongs();
        setSongs(allSongs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Featured Songs
      </Typography>
      <Grid container spacing={3}>
        {songs.map((song) => (
          <Grid item xs={12} sm={6} md={4} key={song.id.toString()}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://picsum.photos/seed/${song.id}/300/200`}
                alt={song.title}
              />
              <CardContent>
                <Typography variant="h6">{song.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {song.artist}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
