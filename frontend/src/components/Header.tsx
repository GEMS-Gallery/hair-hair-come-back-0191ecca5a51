import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ContentCutIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hair Loss Blog
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/create">
          New Post
        </Button>
        <Button color="inherit" component={RouterLink} to="/stages">
          Hair Loss Stages
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
