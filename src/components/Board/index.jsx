import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CommentIcon from "@mui/icons-material/Comment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { UserInfo } from "../UserInfo";
import styles from "./Board.module.scss";
import { BoardSkeleton } from "./Skeleton";
import { MoreMenu } from "../Menus/MoreMenu";
import { fetchBoardRemove } from "../../redux/slices/boards";
import { BoardTitleForm } from "../Forms";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export const Board = ({
  board,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  if (isLoading) {
    return <BoardSkeleton />;
  }

  const removeBoard = () => {
    dispatch(fetchBoardRemove(board.id));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <div className={styles.wrapper}>
        <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          {/* <Link to={`/board/${board.id}`}>{board.title}</Link> */}
          <BoardTitleForm
            id={board.id}
            title={board.title}
            setOpen={setOpen}
            setSuccess={setSuccess}
          />
          {isEditable && <MoreMenu handleRemove={removeBoard} />}
        </h2>
        {children && <div className={styles.content}>{children}</div>}
        <div className={styles.columnDetails}>
          <div>
            <ViewColumnIcon />
            <span>{board.columnCount}</span>
          </div>
          <div>
            <FormatListNumberedIcon />
            <span>{board.taskCount}</span>
          </div>
          <div>
            <CommentIcon />
            <span>{board.commentCount}</span>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={success ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {success
              ? "Title onChanged successfully"
              : "Failed to change title"}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
