import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Boards, FullBoard, Registration, AddPost, Login } from "./pages";

function App () {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/board/:id" element={<FullBoard />} />
          {/* <Route path="/account" element={<Account />} /> */}
          {/* <Route path="/registration" element={<Registration />} /> */}
          {/* <Route path="/registration" element={<Login />} /> */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
