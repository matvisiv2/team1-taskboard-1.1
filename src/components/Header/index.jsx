import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { AccountMenu } from "../Menus/AccountMenu";

export const Header = () => {
  const isAuth = false;

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth="xl">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Taskboard 1.1</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                {/* <Link to="/posts/create">
                  <Button variant="contained">Створити дошку</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Вийти
                </Button> */}
                <AccountMenu />
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outlined">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="contained">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
