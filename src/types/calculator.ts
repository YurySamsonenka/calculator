export type CalculationResult = {
	area: number;
	cellSize: {
		width: number;
		length: number;
	};
	materials: {
		name: string;
		unit: string;
		quantity: number;
		price: number;
		total: number;
	}[];
	totalSum: number;
}
