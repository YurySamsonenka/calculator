import { useCalculatorData } from '../hooks/useCalculatorData';
import { InputPanel } from './InputPanel';
import { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import ResultPanel from './ResultPanel';

export const Calculator = () => {
	const { lists, pipes, frames, sizes, catalog, config, loading, error } = useCalculatorData();

	const [result, setResult] = useState<CalculationResult | null>(null);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex min-h-screen">
			<div className="w-1/2 p-4 bg-gray-100">
				<h2 className="text-xl font-bold mb-4">Параметры конструкции</h2>
				<InputPanel incomingData={{ lists, pipes, frames, sizes, catalog, config }}
					setResult={setResult}/>
			</div>

			<div className="w-1/2 p-4">
				<h2 className="text-xl font-bold mb-4">Результаты расчета</h2>
				{result && <ResultPanel data={result} />}

				{/*<FrameVisualization width={20} length={30} cellSize={{width: 4, length: 7}} pipeWidth={0.03}/>*/}
			</div>
		</div>
	);
};
