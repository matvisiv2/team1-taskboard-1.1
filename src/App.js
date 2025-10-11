import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

import { Header } from "./components";
import { Boards, FullBoard, Registration, AddPost, Login } from "./pages";

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
            {/* <Route path="/account" element={<Account />} /> */}
            {/* <Route path="/registration" element={<Registration />} /> */}
            {/* <Route path="/registration" element={<Login />} /> */}
          </Routes>
        </Container>
      </Box>
    </>
  );
}

export default App;
