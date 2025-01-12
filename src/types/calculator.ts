export type CalculationResult = {
	area: number;
	cellCount: {
		rows: number;
		columns: number;
	};
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
