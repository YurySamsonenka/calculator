export interface BaseConfig {
	type: string;
	key: string;
	name: string;
}

export interface SizeConfig extends BaseConfig {
	type: 'size';
	min: number;
	max: number;
	step: number;
}

export interface FrameConfig extends BaseConfig {
	type: 'frame';
	step: number;
}

export interface MaterialConfig extends BaseConfig {
	type: 'material';
}

export interface FixConfig extends BaseConfig {
	type: 'fix';
	value: number;
}

export type ConfigItem = SizeConfig | FrameConfig | MaterialConfig | FixConfig;

// TODO: вместо общих типов сделать точные
