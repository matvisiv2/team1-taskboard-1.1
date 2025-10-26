import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import clsx from "clsx";
import { useState } from "react";

import styles from "./MoreMenu.module.scss";

export const MoreMenu = ({ handleRemove, setIsEditTitle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClickEdit = () => {
    setIsEditTitle(true);
  };

  const handleOnClickDelete = () => {
    handleClose();
    handleRemove();
  };

  return (
    <div className={clsx(styles.root)}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
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
            <DeleteIcon />
            Edit
          </MenuItem>
        )}
        {handleRemove && (
          <MenuItem onClick={handleOnClickDelete}>
            <DeleteIcon />
            Delete
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};
