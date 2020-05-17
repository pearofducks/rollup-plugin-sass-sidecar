import sass from 'sass'
import { join, basename } from 'path'
import { writeFileSync } from 'fs'

export default (opts = {}) => {
  let css = ''
  let watching = []
  let filename = ''
  return {
    name: 'sidecar',
    transform(_, file) {
      if (!filename) filename = basename(file, '.scss')
      const rendered = sass.renderSync({ file })
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
      writeFileSync(join(options.dir, filename + '.css'), css)
      return null
    }
  }
}
