import { useState, useEffect } from 'react';
import { CatalogItem, ListItem, PipeItem } from '../types/data';
import { ConfigItem, FrameConfig, SizeConfig } from '../types/config';

export const useCalculatorData = () => {
	const [catalog, setCatalog] = useState<CatalogItem[]>([]);
	const [config, setConfig] = useState<ConfigItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const [catalogResponse, configResponse] = await Promise.all([
					fetch('data.json'),
					fetch('config.json')
				]);

				const catalogData = await catalogResponse.json();
				const configData = await configResponse.json();

				setCatalog(catalogData);
				setConfig(configData);
			} catch (err) {
				setError('Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	const lists = catalog.filter((item): item is ListItem => item.type === 'list');
	const pipes = catalog.filter((item): item is PipeItem => item.type === 'pipe');
	const frames = config.filter((item ): item is FrameConfig  => item.type === 'frame');
	const sizes = config.filter((item): item is SizeConfig =>item.type === 'size');

	return { lists, pipes, frames, sizes, loading, error };
};
