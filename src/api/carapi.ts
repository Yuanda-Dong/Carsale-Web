import axios, { AxiosRequestConfig } from "axios";
import { Car, CarEntry, CarResponse } from "../types";

const getAxiosConfig = (): AxiosRequestConfig => {
	const token = sessionStorage.getItem("jwt");
	return {
		headers: {
			"Authorization": token,
			"Content-Type": "application/json",
		},
	};
};

async function getCars(): Promise<CarResponse[]> {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, getAxiosConfig());
	return response.data._embedded.cars;
}

async function deleteCar(link: string): Promise<CarResponse> {
	const response = await axios.delete(link, getAxiosConfig());
	return response.data;
}

async function addCar(car: Car): Promise<CarResponse> {
	const response = await axios.post(
		`${import.meta.env.VITE_API_URL}/api/cars`,
		car,
		getAxiosConfig()
	);
	return response.data;
}

async function updateCar(carEntry: CarEntry): Promise<CarResponse> {
	const response = await axios.put(carEntry.url, carEntry.car, getAxiosConfig());
	return response.data;
}

export { getCars, deleteCar, addCar, updateCar };
