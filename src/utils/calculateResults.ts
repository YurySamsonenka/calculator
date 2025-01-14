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

	const area = formData.length * formData.width;

	const materialLength = 1;
	const sheetsCount = Math.ceil(area / (selectedMaterial.width * materialLength));

	const pipeWidthInMeters = selectedPipe.width / 1000;
	const maxStep = selectedFrame.step;

	const countEqualCellsInLength = Math.ceil((formData.length - pipeWidthInMeters) / maxStep);
	const countEqualCellsInWidth = Math.ceil((formData.width - pipeWidthInMeters) / maxStep);

	const cellLength = formData.length / countEqualCellsInLength;
	const cellWidth = formData.width / countEqualCellsInWidth;

	const lengthLengthwisePipes = formData.length * (countEqualCellsInWidth + 1);
	const lengthWidthwisePipes = (formData.width -
		(pipeWidthInMeters * (countEqualCellsInLength + 1))) * (countEqualCellsInLength + 1);

	const totalPipeLength = lengthLengthwisePipes + lengthWidthwisePipes;

	const fixConfig = config.find(c =>
		c.type === 'fix' && c.key === selectedMaterial.material,
	) as FixConfig;
	const fixData = catalog.find(c => c.type === 'fix') as FixItem;
	const fixCount = Math.ceil(area * fixConfig.value);

	const listTotalPrice = sheetsCount * selectedMaterial.price;
	const pipeTotalPrice = Math.ceil(totalPipeLength) * selectedPipe.price;
	const fixTotalPrice = Math.ceil(fixCount * fixData.price);

	return {
		area,
		cellCount: {
			rows: countEqualCellsInWidth,
			columns: countEqualCellsInLength,
		},
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
				total: listTotalPrice,
			},
			{
				name: selectedPipe.name,
				unit: selectedPipe.unit,
				quantity: Math.ceil(totalPipeLength),
				price: selectedPipe.price,
				total: pipeTotalPrice,
			},
			{
				name: fixData.name,
				unit: fixData.unit,
				quantity: fixCount,
				price: fixData.price,
				total: fixTotalPrice,
			},
		],
		totalSum: listTotalPrice + pipeTotalPrice + fixTotalPrice,
	};
};
