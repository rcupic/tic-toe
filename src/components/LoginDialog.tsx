/* eslint-disable react/destructuring-assignment */
import { FormatShapes } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  StandardTextFieldProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PostViewContext } from '../contexts/PostViewContext';

interface ITextFieldLoginProps extends StandardTextFieldProps {
  errors: { [x: string]: any };
  fieldName: string;
}

const TextFieldLogin = function ({ errors, fieldName, ...restProps }: ITextFieldLoginProps) {
  return (
    <TextField
      {...restProps}
      margin="dense"
      id={fieldName}
      type={fieldName}
      fullWidth
      variant="standard"
      required
      error={!!errors[fieldName]}
      helperText={errors[fieldName]?.message}
    />
  );
};

export const LoginDialog = function () {
  const { open } = React.useContext(PostViewContext);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (): void => {};

  return (
    <Dialog open={open}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Controller
          control={control}
          name="email"
          rules={{ required: 'Email is required' }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              id="email"
              type="email"
              label="Email"
              fullWidth
              variant="standard"
              required
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required', minLength: { value: 8, message: 'Minimum length is 8' } }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              id="password"
              type="password"
              fullWidth
              variant="standard"
              required
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Controller
          control={control}
          name="onSubmit"
          render={() => <Button onClick={handleSubmit(onSubmit)}>Submit</Button>}
        />
      </DialogActions>
    </Dialog>
  );
};
