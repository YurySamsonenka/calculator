import { useCalculatorData } from '../hooks/useCalculatorData';
import { InputPanel } from './InputPanel';

export const Calculator = () => {
	const { lists, pipes, frames, sizes, loading, error } = useCalculatorData();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex min-h-screen">
			<div className="w-1/2 p-4 bg-gray-100">
				<h2 className="text-xl font-bold mb-4">Параметры конструкции</h2>
				<InputPanel data={{ lists, pipes, frames, sizes }} />
			</div>

			<div className="w-1/2 p-4">
				<h2 className="text-xl font-bold mb-4">Результаты расчета</h2>
			</div>
		</div>
	);
};
