import CommentIcon from "@mui/icons-material/Comment";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import clsx from "clsx";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchColumnRemove } from "../../redux/slices/columns";
import { BoardSkeleton } from "../Board/Skeleton";
import { ColumnTitleForm } from "../Forms";
import { MoreMenu } from "../Menus/MoreMenu";
import styles from "./Column.module.scss";
import { Divider } from "@mui/material";

export const Column = ({
  column,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([0]);

  const removeColumn = () => {
    dispatch(fetchColumnRemove(column.id));
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  if (isLoading) {
    return <BoardSkeleton />;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <div className={styles.wrapper}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItemButton component="div">
            {/* <ListItemText
              sx={{ my: 0 }}
              primary="Firebash"
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: "medium",
                letterSpacing: 0,
              }}
            /> */}
            <h2
              className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
            >
              {isEditTitle ? (
                <ColumnTitleForm
                  id={column.id}
                  title={column.title}
                  setIsEditTitle={setIsEditTitle}
                />
              ) : (
                column.title
              )}
              {isEditable && (
                <MoreMenu
                  setIsEditTitle={setIsEditTitle}
                  handleRemove={removeColumn}
                />
              )}
            </h2>
          </ListItemButton>
          <Divider />
          {column.tasks?.map((task, index) => (
            <ListItem
              key={`task-${index}`}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(index)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(index)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": `checkbox-list-label-${index}`,
                    }}
                  />
                </ListItemIcon>
              </ListItemButton>
              <ListItemText
                id={`checkbox-list-label-${index}`}
                sx={{width: "200px"}}
                primary={task.title}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
