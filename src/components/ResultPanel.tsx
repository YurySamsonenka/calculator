import React from 'react';
import { CalculationResult } from '../types/calculator';

type Props = {
	data: CalculationResult
}

const ResultPanel = ({data} : Props) => {
	const { area, cellSize, materials,totalSum } = data;
	return (
		<div className="bg-white pr-6 pl-6 rounded-lg shadow-sm">
			<div className="mb-4">
				<p className="text-gray-700">
					Площадь изделия: {area.toFixed(2)} м²
				</p>
				<p className="text-gray-700">
					Расчетный размер ячейки: {cellSize.width.toFixed(2)}x{cellSize.length.toFixed(2)}м
				</p>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full min-w-full border-collapse">
					<thead>
					<tr className="bg-gray-50">
						<th className="border px-4 py-2 text-left">Наименование</th>
						<th className="border px-4 py-2 text-left">ед.</th>
						<th className="border px-4 py-2 text-left">кол-во</th>
						<th className="border px-4 py-2 text-left">сумма</th>
					</tr>
					</thead>
					<tbody>
					{materials.map((material, index) => (
						<tr key={index} className="hover:bg-gray-50">
							<td className="border px-4 py-2">{material.name}</td>
							<td className="border px-4 py-2">{material.unit}</td>
							<td className="border px-4 py-2">{material.quantity}</td>
							<td className="border px-4 py-2">{material.total}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

			<div className="mt-4">
				<p className="text-lg font-semibold">
					Итого: {totalSum}
				</p>
			</div>
		</div>
	);
};

export default ResultPanel;
