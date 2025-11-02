import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  hideTaskEditForm,
  selectTaskEditForm,
} from "../../../redux/slices/taskEditForm";
import styles from "./TaskEditForm.module.scss";

export const TaskEditForm = () => {
  const dispatch = useDispatch();
  const { open, task } = useSelector(selectTaskEditForm);

  const handleClose = () => {
    dispatch(hideTaskEditForm());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  return (
    <div className={clsx(styles.root)}>
      <Dialog open={open} onClose={handleClose} PaperProps={{ elevation: 8 }}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {task?.title}
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
