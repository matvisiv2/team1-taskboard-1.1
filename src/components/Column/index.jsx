import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { UserInfo } from "../UserInfo";
import styles from "./Column.module.scss";
import { ColumnSkeleton } from "./Skeleton";
import {
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { MoreMenu } from "../Menus/MoreMenu";
import { useDispatch } from "react-redux";
import { fetchRemoveColumn } from "../../redux/slices/columns";

export const Column = ({
  id,
  title,
  tasks,
  children,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();


  if (isLoading) {
    return <ColumnSkeleton />;
  }

  const removeColumn = () => {
    dispatch(fetchRemoveColumn(id));
  };

  return (
    <div className={clsx(styles.root)}>
      <div className={styles.wrapper}>
        <h2 className={clsx(styles.title)}>
          <Badge color="secondary" badgeContent={tasks.length}>
            <div>{title}</div>
          </Badge>
          {isEditable && (
            // <div className={styles.editButtons}>
            //   <Link to={`/column/${id}/edit`}>
            //     <IconButton color="primary">
            //       <EditIcon />
            //     </IconButton>
            //   </Link>
            //   <IconButton onClick={onClickRemove} color="secondary">
            //     <DeleteIcon />
            //   </IconButton>
            // </div>
            <MoreMenu handleRemove={removeColumn} />
          )}
        </h2>
        {children && <div className={styles.content}>{children}</div>}
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
          }}
        >
          {tasks.map((task, i) => (
            <ListItem key={`item-${i}`}>
              <ListItemButton>
                <ListItemText primary={task.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
