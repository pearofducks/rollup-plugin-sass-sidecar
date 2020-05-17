import sidecar from './index'

export default [
  {
  input: './test.js',
  output: { file: './test.min.js', format: 'es' },
  watch: { clearScreen: false }
},
{
  input: './sass/foo.scss',
  plugins: [sidecar()],
  output: { dir: './dist' }
}
]
