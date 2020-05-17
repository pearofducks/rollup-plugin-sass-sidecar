import sass from 'sass'
import postcss from 'postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import { join, basename } from 'path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'

export default (opts = {}) => {
  let css = ''
  let watching = []
  let filename = ''
  return {
    name: 'sidecar',
    async transform(_, file) {
      if (!filename) filename = basename(file, '.scss')
      const rendered = sass.renderSync({ file })
      const { includedFiles } = rendered.stats
      includedFiles.forEach(f => {
        if (!watching.includes(f)) {
          this.addWatchFile(f)
          watching.push(f)
        }
      })
      const rawCSS = rendered.css.toString()
      css = await postcss([autoprefixer, cssnano]).process(rawCSS, { from: file })
      return 'export default ""'
    },
    generateBundle(options, bundle) {
      if (!options.dir) return this.error("output.dir must be specified for sidecar")
      Object.keys(bundle).forEach(filename => delete bundle[filename])
      if (!existsSync(options.dir)) mkdirSync(options.dir)
      writeFileSync(join(options.dir, filename + '.css'), css)
      return null
    }
  }
}
