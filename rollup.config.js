import sidecar from './index'

export default [
  {
  input: './test.js',
  output: { file: './test.min.js', format: 'es' },
  plugins: [
    // sidecar()
  ],
  watch: { clearScreen: false }
},
{
  input: './foo.scss',
  plugins: [sidecar()],
  output: { dir: './dist' }
}
]
