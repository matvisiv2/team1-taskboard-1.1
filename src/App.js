import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";
import {
  Boards,
  FullBoard,
  MyAccount,
  SignIn,
  SignUp,
  TestPage,
} from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

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
            <Route path="/" element={<Navigate to="/boards" replace />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/test/:id" element={<TestPage />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/board/:id" element={<FullBoard />} />
            <Route path="/my-account" element={<MyAccount />} />
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
