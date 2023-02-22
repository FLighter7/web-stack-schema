import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve  from '@rollup/plugin-node-resolve';

const format = 'iife';
const outputPlugins = [terser()];
const plugins = [resolve(), commonjs()];

export default [
	// Data minification
	{
		input: 'data/index.js',
		output: {
			file: 'dist/data.js',
			name: 'data',
			plugins: outputPlugins,
			sourcemap: false,
			format,
		},
		plugins,
	},
	// JS compilation
	{
		input: 'src/index.js',
		output: {
			file: 'dist/index.js',
			plugins: outputPlugins,
			sourcemap: false,
			format,
		},
		plugins,
	},
];
