import { useState } from "react";
import { Car, CarResponse } from "../types";
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";
import EditIcon from "@mui/icons-material/Edit";

type FormProps = {
	cardata: CarResponse;
};

export default function EditCar({ cardata }: FormProps) {
	const [open, setOpen] = useState(false);

	const queryClient = useQueryClient();

	const { mutate } = useMutation(updateCar, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cars"]);
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const handleClickOpen = () => {
		setCar(cardata);
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [car, setCar] = useState<Car>({
		brand: "",
		model: "",
		color: "",
		registrationNumber: "",
		modelYear: 0,
		price: 0,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCar({ ...car, [event.target.name]: event.target.value });
	};

	const handleSave = () => {
		mutate({ car, url: cardata._links.self.href });
		setCar({ brand: "", model: "", color: "", registrationNumber: "", modelYear: 0, price: 0 });
		setOpen(false);
	};

	return (
		<>
			<Tooltip title="Edit car">
				<IconButton size="small" onClick={handleClickOpen}>
					<EditIcon fontSize="small" />
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit car</DialogTitle>
				<CarDialogContent car={car} handleChange={handleChange}></CarDialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
