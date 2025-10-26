import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { hideSnackbar, selectSnackbar } from "../../redux/slices/snackbar";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, success } = useSelector(selectSnackbar);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={handleClose}
        severity={success ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;