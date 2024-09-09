import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { backend } from '../../declarations/backend';

interface Song {
  id: bigint;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

const Library: React.FC = () => {
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

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Library
      </Typography>
      <List>
        {songs.map((song) => (
          <ListItem key={song.id.toString()}>
            <ListItemText
              primary={song.title}
              secondary={`${song.artist} - ${formatDuration(song.duration)}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="play">
                <PlayArrow />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Library;
