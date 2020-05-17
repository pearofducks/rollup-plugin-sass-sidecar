import sass from 'sass'
import { writeFileSync } from 'fs'

export default (opts = {}) => {
  let css = ''
  let watching = []
  return {
    name: 'sidecar',
    transform(data) {
      const rendered = sass.renderSync({ data })
      const { includedFiles } = rendered.stats
      includedFiles.forEach(f => {
        if (!watching.includes(f)) {
          this.addWatchFile(f)
          watching.push(f)
        }
      })
      css = rendered.css.toString()
      return 'export default ""'
    },
    generateBundle(options, bundle) {
      Object.keys(bundle).forEach(filename => delete bundle[filename])
      console.log("GENERATING", options)
      writeFileSync('dist/output.css', css)
      return null
    }
  }
}
