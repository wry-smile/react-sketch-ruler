import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['./src/index.js'],
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
  loader: {
    '.tsx': 'tsx',
  },
  shims: true,
  bundle: false,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  esbuildOptions: (options) => {
    options.bundle = true
    options.jsxFactory = 'h'
    options.jsx = 'preserve'
    options.jsxFragment = 'Fragment'
  },
})

