import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './dist/index.js',
  output: [
    {
      file: './dist/dist.js',
      format: 'umd',
      name: 'SimpleNoviceGuide'
    },
    {
      file: './dist/dist.min.js',
      format: 'umd',
      name: 'SimpleNoviceGuide',
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}
