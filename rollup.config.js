import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

export default defineConfig([
  {
    input: './src/index.tsx',
    output: [
      {
        file: './dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],

    external: ['styled-components', 'react', 'react-dom'],
    plugins: [
      typescript(),
      commonjs(),
      url(),
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      // dts(),
    ],
  },
  {
    input: './src/index.tsx',
    output: [{ file: './dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
])

