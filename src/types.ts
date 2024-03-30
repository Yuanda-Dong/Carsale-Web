type CarResponse = {
	brand: string;
	model: string;
	color: string;
	registrationNumber: string;
	modelYear: number;
	price: number;
	_links: {
		self: { href: string };
		car: { href: string };
		owner: { href: string };
	};
};

type Car = {
	brand: string;
	model: string;
	color: string;
	registrationNumber: string;
	modelYear: number;
	price: number;
};

type CarEntry = {
	car: Car;
	url: string;
};

export type { CarResponse, Car, CarEntry };
