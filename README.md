# rollup-plugin-sass-sidecar

`yarn add --dev rollup-plugin-sass-sidecar`

### example use

```js
import sidecar from 'rollup-plugin-sass-sidecar'

export default {
  input: './main.scss',
  output: { dir: './build/dir' },
  plugins: [ sidecar() ]
}
```
