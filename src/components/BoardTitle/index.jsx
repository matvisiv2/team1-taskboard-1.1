import { CircularProgress, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchBoardChangeTitle,
  fetchBoardRemove,
} from "../../redux/slices/boards";
import { showSnackbar } from "../../redux/slices/snackbar";
import { MoreMenu } from "../Menus/MoreMenu";
import styles from "./BoardTitle.module.scss";

export const BoardTitle = ({ board }) => {
  const inputRef = useRef(null);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oldTitle, setOldTitle] = useState(board.title);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditTitle]);

  const form = useForm({
    defaultValues: {
      title: board.title,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    if (values.title.trim() && oldTitle !== values.title) {
      setIsLoading(true);

      const data = await dispatch(
        fetchBoardChangeTitle({ id: board.id, values }),
      );

      if (data.error) {
        dispatch(
          showSnackbar({
            message: "Failed to change title ",
            success: false,
          }),
        );
      } else {
        setOldTitle(values.title);
        dispatch(
          showSnackbar({
            message: "Title changed succesfully",
            success: true,
          }),
        );
      }
    }
    setIsLoading(false);
    setIsEditTitle(false);
  };

  const handleOnBlur = () => {
    form.handleSubmit(onSubmit)();
  };

  const removeBoard = async () => {
    const data = await dispatch(fetchBoardRemove(board.id));

    if (data.error) {
      dispatch(
        showSnackbar({
          message: "Failed to remove board",
          success: false,
        }),
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Board removed successfully",
          success: true,
        }),
      );
    }
  };

  if (!isEditTitle) {
    return (
      <>
        <Link to={`${process.env.PUBLIC_URL}/board/${board.id}`}>{board.title}</Link>
        <MoreMenu setIsEditTitle={setIsEditTitle} handleRemove={removeBoard} />
      </>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        name="title"
        inputRef={inputRef}
        fullWidth
        variant="outlined"
        size="small"
        className="field"
        sx={{
          "& .MuiInputBase-input": {
            fontWeight: "bold",
            fontSize: "18px",
          },
        }}
        {...form.register("title", {
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
  );
};
