import babel from 'rollup-plugin-babel';


export default {
	input: 'src/index',
	output: {
		file: 'lib/index.js',
		format: 'cjs'
	},
	external: ['react', 'prop-types'],
	plugins: [
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers']
		})
	]
};