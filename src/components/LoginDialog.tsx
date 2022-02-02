/* eslint-disable react/destructuring-assignment */
import { Button, capitalize, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { Controller, FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { PostViewContext } from '../contexts/PostViewContext';

interface ITextFieldLoginProps {
  errors: { [x: string]: any };
  fieldName: string;
  register: UseFormRegister<FieldValues>;
}

const TextFieldLogin = function ({ errors, fieldName, register }: ITextFieldLoginProps) {
  return (
    <TextField
      {...register(fieldName)}
      margin="dense"
      id={fieldName}
      type={fieldName}
      label={capitalize(fieldName)}
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
    register,
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
          render={() => <TextFieldLogin errors={errors} fieldName="email" register={register} />}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required', minLength: { value: 8, message: 'Minimum length is 8' } }}
          defaultValue=""
          render={() => <TextFieldLogin errors={errors} fieldName="password" register={register} />}
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
