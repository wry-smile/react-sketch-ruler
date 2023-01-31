import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript'

export default defineConfig({
  input: 'src/index.js',
  output: [
    {
      file: 'index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'index.mjs',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
    }),
    external(),
    url(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
  ],
})
