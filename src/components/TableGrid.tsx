import React from 'react';

type TableGridProps = {
  rows: number;
  columns: number;
  length: number;
  width: number;
}

export const TableGrid = ({
                            rows,
                            columns,
                            length,
                            width
                          }: TableGridProps) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, ${20 * (width / length)}px)`,
    gridTemplateRows: `repeat(${rows}, ${20 * (length / width)}px)`,
    aspectRatio: `${width}/${length}`
  };

  const cells = Array(rows * columns).fill(null);

  return (
    <div className="flex-col items-center ">
      <h3 className={'font-bold p-2 al'}>Схема ячеек</h3>

      <div
        className="border grid w-full"
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
