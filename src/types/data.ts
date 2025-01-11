export interface ListItem {
	type: 'list';
	name: string;
	material: 'plastic' | 'metal';
	unit: 'м2';
	width: number;
	price: number;
}

export interface PipeItem {
	type: 'pipe';
	name: string;
	unit: 'мп';
	width: number;
	price: number;
}

export interface FixItem {
	type: 'fix';
	name: string;
	unit: 'шт';
	price: number;
}

export type CatalogItem = ListItem | PipeItem | FixItem;
