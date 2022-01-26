import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { LoginDialogContext } from '../contexts/LoginDialogContext';

export const LoginDialog = function () {
  const { open, onSubmit } = React.useContext(LoginDialogContext);

  return (
    <Dialog open={open}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
        <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
