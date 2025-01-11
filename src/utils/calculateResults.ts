import { ConfigItem, FixConfig, FrameConfig } from '../types/config';
import { CatalogItem, FixItem, ListItem, PipeItem } from '../types/data';
import { CalculationResult } from '../types/calculator';
import { InputPanelData } from '../components/InputPanel';

type Data = {
	formData: InputPanelData,
	lists: ListItem[],
	pipes: PipeItem[],
	frames: FrameConfig[],
	config: ConfigItem[],
	catalog: CatalogItem[],
}

export const calculateResults = (
	data: Data,
): CalculationResult => {
	const { formData, lists, pipes, frames, config, catalog } = data;
	const selectedMaterial = lists.find(list => list.name === formData.selectedMaterial)!;
	const selectedPipe = pipes.find(pipe => pipe.name === formData.selectedPipe)!;
	const selectedFrame = frames.find(frame => frame.name === formData.strength)!;

	// Площадь изделия
	const area = formData.length * formData.width;

	// Расчет количества листов (учитывая что длина листа 1м)
	const materialLength = 1;
	const sheetsCount = Math.ceil(area / (selectedMaterial.width * materialLength));

	// Расчет размера ячейки и количества трубы
	const pipeWidthInMeters = selectedPipe.width / 1000;
	const maxStep = selectedFrame.step;

	// Расчет количества ячеек и их размера
	const countEqualCellsInLength = Math.ceil(formData.length / maxStep);
	const countEqualCellsInWidth = Math.ceil(formData.width / maxStep);

	const cellLength = formData.length / countEqualCellsInLength;
	const cellWidth = formData.width / countEqualCellsInWidth;

	// Расчет длины трубы
	const lengthLengthwisePipes = (countEqualCellsInWidth + 1) *
		countEqualCellsInLength *
		(cellLength + pipeWidthInMeters);
	const lengthWidthwisePipes = (countEqualCellsInLength + 1) *
		countEqualCellsInWidth *
		(cellWidth + pipeWidthInMeters);
	const totalPipeLength = lengthLengthwisePipes + lengthWidthwisePipes;

	// Расчет количества саморезов
	const fixConfig = config.find(c =>
		c.type === 'fix' && c.key === selectedMaterial.material,
	) as FixConfig;
	// console.log(fixConfig);
	const fixData = catalog.find(c => c.type === 'fix') as FixItem;
	const fixCount = Math.ceil(area * fixConfig.value);

	// Формируем результат
	return {
		area,
		cellSize: {
			width: cellWidth,
			length: cellLength,
		},
		materials: [
			{
				name: selectedMaterial.name,
				unit: selectedMaterial.unit,
				quantity: sheetsCount,
				price: selectedMaterial.price,
				total: sheetsCount * selectedMaterial.price,
			},
			{
				name: selectedPipe.name,
				unit: selectedPipe.unit,
				quantity: Math.ceil(totalPipeLength),
				price: selectedPipe.price,
				total: Math.ceil(totalPipeLength) * selectedPipe.price,
			},
			{
				name: fixData.name,
				unit: fixData.unit,
				quantity: fixCount,
				price: fixData.price,
				total: fixCount * fixData.price,
			},
		],
		totalSum: sheetsCount * selectedMaterial.price +
			Math.ceil(totalPipeLength) * selectedPipe.price +
			fixCount * fixData.price,
	};
};

//TODO избавиться от знака !
