import React from 'react';

interface TableGridProps {
	rows: number;
	columns: number;
	length: number;
	width: number;
}

const TableGrid: React.FC<TableGridProps> = ({
	rows,
	columns,
	length,
	width
}) => {
	const gridStyle = {
		gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
		gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
		aspectRatio: `${width}/${length}`,
	};

	const cells = Array(rows * columns).fill(null);

	return (
		<div className="flex-col items-center ">
<h3 className={'font-bold p-2 al'}>Схема ячеек</h3>

			<div
				className="w-full border border-black grid"
				style={gridStyle}
			>
				{cells.map((_, index) => (
					<div
						key={index}
						className="border border-black w-full h-full"
					/>
				))}
			</div>
		</div>
	);
};

export default TableGrid;
