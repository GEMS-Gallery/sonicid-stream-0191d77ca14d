import React, { useState } from 'react';
import { Typography, Card, CardContent, CardMedia, IconButton, Slider, Box } from '@mui/material';
import { PlayArrow, Pause, SkipPrevious, SkipNext } from '@mui/icons-material';

const NowPlaying: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (event: Event, newValue: number | number[]) => {
    setProgress(newValue as number);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        sx={{ width: '100%', height: 0, paddingTop: '56.25%' }} // 16:9 aspect ratio
        image="https://picsum.photos/seed/music/400/400"
        alt="Album cover"
      />
      <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography component="div" variant="h5">
            Song Title
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Artist Name
          </Typography>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            <SkipPrevious />
          </IconButton>
          <IconButton aria-label="play/pause" onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton aria-label="next">
            <SkipNext />
          </IconButton>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={progress}
          min={0}
          step={1}
          max={100}
          onChange={handleProgressChange}
          sx={{ color: '#1DB954' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -2 }}>
          <Typography variant="caption" color="text.secondary">{`${Math.floor(progress / 60)}:${(progress % 60).toString().padStart(2, '0')}`}</Typography>
          <Typography variant="caption" color="text.secondary">3:30</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NowPlaying;
