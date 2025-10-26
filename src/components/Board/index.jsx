import CommentIcon from "@mui/icons-material/Comment";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBoardRemove } from "../../redux/slices/boards";
import { BoardTitleForm } from "../Forms";
import { MoreMenu } from "../Menus/MoreMenu";
import styles from "./Board.module.scss";
import { BoardSkeleton } from "./Skeleton";

export const Board = ({
  board,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const [isEditTitle, setIsEditTitle] = useState(false);

  const dispatch = useDispatch();

  if (isLoading) {
    return <BoardSkeleton />;
  }

  const removeBoard = () => {
    dispatch(fetchBoardRemove(board.id));
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <div className={styles.wrapper}>
        <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          {isEditTitle ? (
            <BoardTitleForm
              id={board.id}
              title={board.title}
              setIsEditTitle={setIsEditTitle}
            />
          ) : (
            <Link to={`/board/${board.id}`}>{board.title}</Link>
          )}
          {isEditable && <MoreMenu setIsEditTitle={setIsEditTitle} handleRemove={removeBoard} />}
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
      </div>
    </div>
  );
};
