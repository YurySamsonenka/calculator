import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CatalogItem, ListItem, PipeItem } from '../types/data';
import { ConfigItem, FrameConfig, SizeConfig } from '../types/config';
import { calculateResults } from '../utils/calculateResults';
import { CalculationResult } from '../types/calculator';

export type InputPanelData = {
	selectedMaterial: string
	selectedPipe: string
	width: number
	length: number
	strength: string
}

type Props = {
	incomingData: {
		lists: ListItem[]
		pipes: PipeItem[]
		frames: FrameConfig[]
		sizes: SizeConfig[]
		catalog: CatalogItem[]
		config: ConfigItem[]
	}
	setFormData: (data: CalculationResult) => void
}

const STORAGE_KEY = 'calculatorFormData';

export function InputPanel({ incomingData, setFormData }: Props) {
	const { lists, pipes, frames, sizes, catalog, config } = incomingData;
	const { register, handleSubmit, setValue, formState: { errors } } = useForm<InputPanelData>();

	useEffect(() => {
		const savedData = sessionStorage.getItem(STORAGE_KEY);
		if (savedData) {
			const parsedData = JSON.parse(savedData);
			setValue('selectedMaterial', parsedData.selectedMaterial);
			setValue('selectedPipe', parsedData.selectedPipe);
			setValue('width', parsedData.width);
			setValue('length', parsedData.length);
			setValue('strength', parsedData.strength);
		}
	}, [setValue]);

	const onSubmit = (data: InputPanelData) => {
		const calculatedResults = calculateResults({
			lists,
			pipes,
			frames,
			formData: data,
			config,
			catalog,
		});

		if (calculatedResults) {
			setFormData(calculatedResults);
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		}
	};

	const widthConfig = sizes.find(size => size.key === 'width');
	const lengthConfig = sizes.find(size => size.key === 'length');

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={'mb-3'}>
				<label className="block text-sm font-medium text-gray-700">
					Материал листа
				</label>
				<select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" {...register(
					'selectedMaterial',
					{ required: true })}>
					<option value="">Выберите материал</option>
					{lists.map(list => (
						<option key={list.name} value={list.name}>
							{list.name}
						</option>
					))}
				</select>
				{errors.selectedMaterial &&
          <span className={'text-red-500'}>Это поле обязательно для заполнения</span>}
			</div>

			<div className={'mb-3'}><label className="block text-sm font-medium text-gray-700">
				Тип трубы
			</label>
				<select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" {...register(
					'selectedPipe',
					{ required: true })}>
					<option value="">Выберите трубу</option>
					{pipes.map(pipe => (
						<option key={pipe.name} value={pipe.name}>
							{pipe.name}
						</option>
					))}
				</select>
				{errors.selectedPipe &&
          <span className={'text-red-500'}>Это поле обязательно для заполнения</span>}
			</div>

			<div className={'mb-3 flex gap-x-10'}>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Ширина (м)
					</label>
					<input
						className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
						type="number"
						placeholder="Width"
						min={widthConfig?.min}
						max={widthConfig?.max} step={widthConfig?.step} {...register('width',
						{ required: true, max: widthConfig?.max, min: widthConfig?.min })} />
					{errors.width &&
            <span className={'text-red-500'}>Это поле обязательно для заполнения</span>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Длина (м)
					</label>
					<input
						className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
						type="number"
						placeholder="Length"
						min={lengthConfig?.min}
						max={lengthConfig?.max} step={lengthConfig?.step} {...register('length',
						{ required: true, max: lengthConfig?.max, min: lengthConfig?.min })} />
					{errors.length &&
            <span className={'text-red-500'}>Это поле обязательно для заполнения</span>}
				</div>
			</div>

			<div className={'mb-3'}>
				<label className="block text-sm font-medium text-gray-700">
					Тип конструкции
				</label>
				{frames.map(frame => (
					<div key={frame.key} className="flex items-center">
						<input className="h-4 w-4 border-gray-300 text-indigo-600" id={frame.key} {...register(
							'strength',
							{ required: true })} type="radio"
							value={frame.name} />
						<label htmlFor={frame.key} className="ml-2 block text-sm text-gray-900">
							{frame.name}
						</label>
					</div>
				))}
				{errors.strength &&
          <span className={'text-red-500'}>Это поле обязательно для заполнения</span>}
			</div>

			<input className={'bg-amber-400 hover:bg-amber-500 font-bold py-2 px-4 rounded cursor-pointer'}
				type="submit" />
		</form>
	);
}

//TODO сделать ширину и длину через map
