import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

import { Header } from "./components";
import { Boards, FullBoard, AddPost, SignIn, SignUp } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";

function App () {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <Container
          maxWidth="xl"
          sx={{ display: "flex", overflowX: "auto", flex: 1 }}
        >
          <Routes>
            {isAuth && (
              <>
                <Route path="/" element={<Navigate to="/boards" replace />} />
                <Route path="/boards" element={<Boards />} />
                <Route path="/board/:id" element={<FullBoard />} />
                {/* <Route path="/account" element={<Account />} /> */}
              </>
            )}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
          <GlobalSnackbar />
        </Container>
      </Box>
    </>
  );
}

export default App;
