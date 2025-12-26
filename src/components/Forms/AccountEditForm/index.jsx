import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateMe, getMe } from "../../../redux/slices/auth";
import { showSnackbar } from "../../../redux/slices/snackbar";
import styles from "./AccountEditForm.module.scss";

export const AccountEditForm = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(getMe);
  const dispatch = useDispatch();

  const form = useForm();

  useEffect(() => {
    form.reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
  }, [user]);

  const onSubmit = async (values) => {
    setLoading(true);
    const data = await dispatch(fetchUpdateMe(values));
    if (data?.error) {
      dispatch(
        showSnackbar({
          message: "Failed to update user information",
          // message: data?.error.message,
          success: false,
        }),
      );
    } else {
      dispatch(
        showSnackbar({
          message: data.payload.message,
          success: true,
        }),
      );
    }
    setLoading(false);
  };

  return (
    <Box className={styles.root}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card sx={{ padding: "4vh" }}>
          <CardHeader
            title="My account"
            subheader="Edite personal information"
          />
          <CardContent>
            <Stack spacing={3} sx={{ alignItems: "center", width: "25vw" }}>
              <div>
                <Avatar
                  src={user?.avatar}
                  sx={{ height: "80px", width: "80px" }}
                />
              </div>
              <Stack spacing={1} sx={{ textAlign: "center" }}>
                <Typography variant="h5">{user?.firstName}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {user?.email}
                </Typography>
              </Stack>

              <FormControl
                fullWidth
                {...form.register("firstName", {
                  required: "Enter first name",
                })}
              >
                <InputLabel>First name</InputLabel>
                <OutlinedInput label="First name" name="firstName" />
              </FormControl>

              <FormControl
                fullWidth
                {...form.register("lastName", { required: "Enter last name" })}
              >
                <InputLabel>Last name</InputLabel>
                <OutlinedInput label="Last name" name="lastName" />
              </FormControl>

              <FormControl
                fullWidth
                {...form.register("email", { required: "Enter e-mail" })}
              >
                <InputLabel>Email address</InputLabel>
                <OutlinedInput label="Email address" name="email" />
              </FormControl>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained">
              Save details
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};
