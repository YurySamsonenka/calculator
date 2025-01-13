import { useCalculatorData } from '../hooks/useCalculatorData';
import { InputPanel } from './InputPanel';
import { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import ResultPanel from './ResultPanel';
import {TableGrid} from './TableGrid';

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

				{result && <TableGrid
          rows={result.cellCount.rows}
          columns={result.cellCount.columns}
          length={result.cellSize.length}
          width={result.cellSize.width}
        />}
			</div>
		</div>
	);
};
