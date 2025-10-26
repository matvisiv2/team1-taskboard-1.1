import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchBoardChangeTitle } from "../../../redux/slices/boards";
import styles from "./BoardTitleForm.module.scss";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { showSnackbar } from "../../../redux/slices/snackbar";

export const BoardTitleForm = ({ id, title, setIsEditTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldTitle, setOldTitle] = useState(title);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      title,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      if (oldTitle !== values.title) {
        setIsLoading(true);

        const data = await dispatch(fetchBoardChangeTitle({ id, values }));

        if (data.payload) {
          setOldTitle(values.title);
          dispatch(
            showSnackbar({
              message: "Title changed succesfully",
              success: true,
            }),
          );
        }
      }
    } catch (err) {
      showSnackbar({
        message: "Title change failed",
        success: false,
      });
    } finally {
      setIsLoading(false);
      setIsEditTitle(false);
    }
  };

  const handleOnBlur = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          name="title"
          fullWidth
          variant="outlined"
          size="small"
          className="field"
          sx={{
            // "& .MuiOutlinedInput-root": {
            //   "& fieldset": { border: "none" },
            //   "&:hover fieldset": { border: "1px solid black" },
            //   "&.Mui-focused fieldset": { border: "1px solid blue" },
            // },
            "& .MuiInputBase-input": {
              fontWeight: "bold",
              fontSize: "18px",
            },
          }}
          {...form.register("title", {
            required: "type board title",
            onBlur: handleOnBlur,
          })}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {isLoading ? <CircularProgress size={18} /> : null}
                </InputAdornment>
              ),
            },
          }}
        />
      </form>
    </>
  );
};
