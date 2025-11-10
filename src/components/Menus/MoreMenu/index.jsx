import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import clsx from "clsx";
import { useState } from "react";
import styles from "./MoreMenu.module.scss";

export const MoreMenu = ({ setIsEditTitle, handleRemove }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // Taking focus away before the menu hides
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setAnchorEl(null);
  };

  const handleOnClickEdit = () => {
    handleClose();
    setIsEditTitle(true);
  };

  const handleOnClickDelete = async () => {
    setIsLoading(true);
    handleClose();
    await new Promise((r) => setTimeout(r, 50));
    await handleRemove();
    setIsLoading(false);
  };

  return (
    <div className={clsx(styles.root)}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        loading={isLoading}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {setIsEditTitle && (
          <MenuItem onClick={handleOnClickEdit}>
            <EditIcon />
            Edit
          </MenuItem>
        )}
        {handleRemove && (
          <MenuItem name="basic-button" onClick={handleOnClickDelete}>
            <DeleteIcon />
            Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};
