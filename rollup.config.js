import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';


export default {
	input: 'src/index',
	output: {
		file: 'lib/index.js',
		format: 'cjs'
	},
	external: ['react', 'prop-types'],
	plugins: [
		postcss(),
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers']
		})
	]
};