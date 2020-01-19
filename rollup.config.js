import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve  from '@rollup/plugin-node-resolve';

const input  = 'src/index.js',
      output = 'dist/index',
      format = 'iife';

export default
{
    input,
    output:
    {
        format,
        file:      `${output}.min.js`,
        plugins:   [ terser() ],
        sourcemap: true,
    },
    plugins:
    [
        resolve(),
        commonjs(),
    ],
}
