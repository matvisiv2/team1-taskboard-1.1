import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

import { Header } from "./components";
import { Boards, FullBoard, AddPost, SignIn, SignUp } from "./pages";

function App () {
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
            <Route path="/boards" element={<Boards />} />
            <Route path="/board/:id" element={<FullBoard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/* <Route path="/account" element={<Account />} /> */}
          </Routes>
        </Container>
      </Box>
    </>
  );
}

export default App;
