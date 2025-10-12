import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { UserInfo } from "../UserInfo";
import styles from "./Board.module.scss";
import { BoardSkeleton } from "./Skeleton";

export const Board = ({
  id,
  title,
  columnCount,
  taskCount,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  if (isLoading) {
    return <BoardSkeleton />;
  }

  const onClickRemove = () => {};

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {/* {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/board/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )} */}
      <div className={styles.wrapper}>
        <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
          {isFullPost ? title : <Link to={`/board/${id}`}>{title}</Link>}
        </h2>
        {children && <div className={styles.content}>{children}</div>}
        <div className={styles.columnDetails}>
          <div>
            <ViewColumnIcon />
            <span>{columnCount}</span>
          </div>
          <div>
            {/* <FormatListBulletedIcon /> */}
            <ListAltIcon />
            <span>{taskCount}</span>
          </div>
        </div>
        {/* <UserInfo {...user} additionalText={createdAt} /> */}
      </div>
    </div>
  );
};
