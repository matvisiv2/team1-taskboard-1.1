import { CircularProgress, InputAdornment, ListItemText } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  fetchColumnChangeTitle,
  fetchColumnRemove,
} from "../../redux/slices/columns";
import { showSnackbar } from "../../redux/slices/snackbar";
import styles from "./ColumnTitle.module.scss";
import { MoreMenu } from "../Menus/MoreMenu";

export const ColumnTitle = ({ column }) => {
  const inputRef = useRef(null);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oldTitle, setOldTitle] = useState(column.title);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditTitle]);

  const form = useForm({
    defaultValues: {
      title: column.title,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    if (values.title.trim() && oldTitle !== values.title) {
      setIsLoading(true);

      const data = await dispatch(
        fetchColumnChangeTitle({ id: column.id, values }),
      );

      if (data.error) {
        dispatch(
          showSnackbar({ message: "Failed to change title", success: false }),
        );
      } else {
        setOldTitle(values.title);
        dispatch(
          showSnackbar({ message: "Title changed succesfully", success: true }),
        );
      }
    }

    setIsLoading(false);
    setIsEditTitle(false);
  };

  const handleOnBlur = () => {
    form.handleSubmit(onSubmit)();
  };

  const removeColumn = async () => {
    const data = await dispatch(fetchColumnRemove(column.id));

    if (data.error) {
      dispatch(
        showSnackbar({
          message: "Failed to remove list",
          success: false,
        }),
      );
    } else {
      dispatch(
        showSnackbar({
          message: "List removed successfully",
          success: true,
        }),
      );
    }
  };

  if (!isEditTitle) {
    return (
      <>
        <ListItemText
          sx={{ my: 0 }}
          primary={column.title}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        />

        <MoreMenu setIsEditTitle={setIsEditTitle} handleRemove={removeColumn} />
      </>
    );
  }

  return (
    <>
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
    </>
  );
};
