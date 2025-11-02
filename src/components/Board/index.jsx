import CommentIcon from "@mui/icons-material/Comment";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import clsx from "clsx";
import { BoardTitle } from "./../BoardTitle";
import { GlobalSkeleton } from "../GlobalSkeleton";
import styles from "./Board.module.scss";

export const Board = ({
  board,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  if (isLoading) {
    return <GlobalSkeleton />;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <div className={styles.wrapper}>
        <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          <BoardTitle board={board} />
        </h2>
        {children && <div className={styles.content}>{children}</div>}
        <div className={styles["column-details"]}>
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
