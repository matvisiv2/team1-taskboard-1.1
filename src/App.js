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
  }, [dispatch]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <Container
          maxWidth="xl"
          sx={{ display: "flex", overflowX: "auto", flex: 1 }}
        >
          <Routes>
            <Route path={process.env.PUBLIC_URL} element={<Navigate to={`${process.env.PUBLIC_URL}/boards`} replace />} />
            <Route path={`${process.env.PUBLIC_URL}/test`} element={<TestPage />} />
            <Route path={`${process.env.PUBLIC_URL}/test/:id`} element={<TestPage />} />
            <Route path={`${process.env.PUBLIC_URL}/boards`} element={<Boards />} />
            <Route path={`${process.env.PUBLIC_URL}/board/:id`} element={<FullBoard />} />
            <Route path={`${process.env.PUBLIC_URL}/my-account`} element={<MyAccount />} />
            <Route path={`${process.env.PUBLIC_URL}/signup`} element={<SignUp />} />
            <Route path={`${process.env.PUBLIC_URL}/signin`} element={<SignIn />} />
            <Route path="*" element={<Navigate to={`${process.env.PUBLIC_URL}/signin`} replace />} />
          </Routes>
          <GlobalSnackbar />
        </Container>
      </Box>
    </>
  );
}

export default App;
