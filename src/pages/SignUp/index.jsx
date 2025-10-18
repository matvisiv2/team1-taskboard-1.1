import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./SignUp.module.scss";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchSignUp } from "../../redux/slices/auth";

export const SignUp = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "TestFirst",
      lastName: "TestLast",
      email: "test@gmail.com",
      password: "test",
      confirmPassword: "test",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    dispatch(fetchSignUp(values));
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="First name"
          fullWidth
          {...register("firstName", { required: "type first name" })}
        />
        <TextField
          className={styles.field}
          label="Last name"
          fullWidth
          {...register("lastName", { required: "type last name" })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          {...register("email", { required: "type E-mail" })}
        />
        <TextField
          className={styles.field}
          label="Password"
          fullWidth
          {...register("password", { required: "type password" })}
        />
        <TextField
          className={styles.field}
          label="Confirm password"
          fullWidth
          {...register("confirmPassword", { required: "confirm password" })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Sign Up
        </Button>
      </form>
    </Paper>
  );
};
