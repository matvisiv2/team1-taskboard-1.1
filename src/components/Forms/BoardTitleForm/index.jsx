import { Alert, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchBoardChangeTitle } from "../../../redux/slices/boards";
import styles from "./BoardTitleForm.module.scss";

export const BoardTitleForm = ({ id, title, setOpen, setSuccess }) => {
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
      if (oldTitle == values.title) {
        return;
      }
      setIsLoading(true);
      const data = await dispatch(fetchBoardChangeTitle({ id, values }));
      setOldTitle(values.title);
      data.payload ? setSuccess(true) : setSuccess(false);
      setOpen(true);
    } catch (err) {
      setSuccess(false);
      setOpen(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "1px solid black" },
              "&.Mui-focused fieldset": { border: "1px solid blue" },
            },
            "& .MuiInputBase-input": {
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            },
          }}
          {...form.register("title", {
            required: "type board title",
            onBlur: () => form.handleSubmit(onSubmit)(),
          })}
        />
      </form>
    </>
  );
};
