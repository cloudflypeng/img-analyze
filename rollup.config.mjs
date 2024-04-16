import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// rollup.config.mjs

export default {
  input: './index.js',
  output: {
    file: 'dist/cli.js',
    format: 'cjs',
  },
  plugins: [resolve(), commonjs()],
};
