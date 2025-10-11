import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Boards, FullPost, Registration, AddPost, Login } from "./pages";

function App () {
	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path="/" element={<Boards />} />
					{/*<FullPost />*/}
					{/*<AddPost />*/}
					{/*<Login />*/}
					{/*<Registration />*/}
				</Routes>
			</Container>
		</>
	);
}

export default App;
