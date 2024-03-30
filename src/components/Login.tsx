import { Button, Snackbar, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import Carlist from "./Carlist";
import { LoginContext } from "../LoginContext";

type User = {
	username: String;
	password: String;
};

export default function Login() {
	const [user, setUser] = useState<User>({
		username: "",
		password: "",
	});
	const [open, setOpen] = useState(false);

	const { isAuthenticated, setAuth } = useContext(LoginContext);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const handleLogin = () => {
		axios
			.post(import.meta.env.VITE_API_URL + "/login", user, {
				headers: { "Content-Type": "application/json" },
			})
			.then((res) => {
				const jwtToken = res.headers.authorization;

				if (jwtToken !== null) {
					sessionStorage.setItem("jwt", jwtToken);
					setAuth(true);
				}
			})
			.catch(() => setOpen(true));
	};

	if (isAuthenticated) {
		return <Carlist />;
	} else {
		return (
			<>
				<Stack spacing={2} alignItems="center" mt={2}>
					<TextField name="username" label="Username" onChange={handleChange} />{" "}
					<TextField
						type="password"
						name="password"
						label="Password"
						onChange={handleChange}
					/>{" "}
					<Button variant="outlined" color="primary" onClick={handleLogin}>
						Login
					</Button>
				</Stack>
				<Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={() => setOpen(false)}
					message="Login failed: Check your username and password"
				/>
			</>
		);
	}
}
