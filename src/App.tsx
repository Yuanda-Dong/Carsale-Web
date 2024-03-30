import { AppBar, Button, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
import { LoginContext } from "./LoginContext";
import { useState } from "react";

const queryClient = new QueryClient();


export default function App() {
	const [isAuthenticated, setAuth] = useState(false);
	const handleLogOut = () => {
		setAuth(false);
		sessionStorage.setItem("jwt", "");
	};
	return (
		<LoginContext.Provider value={{ isAuthenticated, setAuth }}>
			<Container maxWidth="xl">
				<CssBaseline />
				<AppBar position="static">
					<Toolbar>
						<Typography sx={{ flexGrow: 1 }}>Car Shop</Typography>
						{isAuthenticated ? (
							<Button onClick={handleLogOut}>
								<Typography>Log out</Typography>
							</Button>
						) : (
							<></>
						)}
					</Toolbar>
				</AppBar>
				<QueryClientProvider client={queryClient}>
					<Login />
				</QueryClientProvider>
			</Container>
		</LoginContext.Provider>
	);
}
