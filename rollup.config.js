import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'predictablesPlot',
    sourcemap: true,
  },
  plugins: [resolve(), commonjs(), terser()],
};
