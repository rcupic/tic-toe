import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { PostViewContext } from '../contexts/PostViewContext';

const regEmail =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRequirement = 'Password must have at least 8 characters';

const isPasswordValid = (value: string | undefined): boolean => {
  if (value === undefined || value.length < 8) {
    return false;
  }

  return true;
};

const isMailValid = (value: string | undefined) => {
  if (value === undefined || !regEmail.test(value)) {
    return false;
  }

  return true;
};

export const LoginDialog = function () {
  const { open, onSubmit: globalOnSubmit } = React.useContext(PostViewContext);
  const [mailAddress, changeMailAddress] = useState<string | undefined>();
  const [password, changePassword] = useState<string | undefined>();
  const [mailError, changeMailError] = useState<string | undefined>();
  const [passwordError, changePasswordError] = useState<string | undefined>();
  const [disabled, changeDisabled] = useState(true);

  useEffect(() => {
    if (password && isPasswordValid(password) && isMailValid(mailAddress) && mailAddress) {
      changeDisabled(false);
    } else {
      changeDisabled(true);
    }
  }, [password, mailAddress]);

  const onMailChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e): void => {
    changeMailAddress(e.target.value);
  };

  const onPasswordChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e): void => {
    changePassword(e.target.value);
  };

  const onPasswordBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e): void => {
    if (!isPasswordValid(password)) {
      changePasswordError(passwordRequirement);
    } else {
      changePasswordError(undefined);
    }
  };

  const onMailBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e): void => {
    if (!isMailValid(mailAddress)) {
      changeMailError('Mail is invalid');
    } else {
      changeMailError(undefined);
    }
  };

  const onPasswordFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e): void => {
    changePasswordError(undefined);
  };

  const onMailFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e): void => {
    changeMailError(undefined);
  };

  const onSubmit = (): void => {
    if (password && !passwordError && mailAddress && !mailError) {
      globalOnSubmit();
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={onMailChange}
          onBlur={onMailBlur}
          onFocus={onMailFocus}
          error={!!mailError}
          helperText={mailError}
        />
        <TextField
          required
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
          onFocus={onPasswordFocus}
          error={!!passwordError}
          helperText={passwordError}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} onClick={onSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
