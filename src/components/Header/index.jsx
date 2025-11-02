import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMe, selectIsAuth } from "../../redux/slices/auth";
import { AccountMenu } from "../Menus/AccountMenu";
import styles from "./Header.module.scss";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const me = useSelector(getMe);

  return (
    <div className={styles.root}>
      <Container maxWidth="xl">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div className={styles.insideLogo}>
              <div>
                <FormatListNumberedIcon className={styles.logoIcon}/>
              </div>
              <div>Taskboard 1.1</div>
            </div>
          </Link>
          <Link className={styles.user} to="/profile">
            {me?.firstName} {me?.lastName}
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <AccountMenu />
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
