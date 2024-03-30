import { useState } from "react";
import { Car } from "../types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

export default function AddCar() {
	const [open, setOpen] = useState(false);
	const [car, setCar] = useState<Car>({
		brand: "",
		model: "",
		color: "",
		registrationNumber: "",
		modelYear: 0,
		price: 0,
	});
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCar({ ...car, [event.target.name]: event.target.value });
	};
	const queryClient = useQueryClient();

	const { mutate } = useMutation(addCar, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cars"]);
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const handleSave = () => {
		mutate(car);
		setCar({ brand: "", model: "", color: "", registrationNumber: "", modelYear: 0, price: 0 });
		handleClose();
	};

	return (
		<>
			<Button onClick={handleClickOpen}>New Car</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>New car</DialogTitle>
				<CarDialogContent car={car} handleChange={handleChange}></CarDialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
