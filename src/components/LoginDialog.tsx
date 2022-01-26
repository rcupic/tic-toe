import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { PostViewContext } from '../contexts/PostViewContext';

export const LoginDialog = function () {
  const { open, onSubmit } = React.useContext(PostViewContext);

  return (
    <Dialog open={open}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
        <TextField autoFocus margin="dense" id="name" label="Password" type="password" fullWidth variant="standard" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
