const { rmSync } = require('fs')
const { series } = require('gulp')

const uuid = require('../resources/metadata.json').uuid
const outDir = require('../tsconfig.json').compilerOptions.outDir

const filename_zip = `${uuid}.shell-extension.zip`

const clean = async () => {
  rmSync(outDir, { recursive: true, force: true })
  rmSync(filename_zip, { recursive: true, force: true })
}

const zip = (cb) => require('child_process')
  .exec(`
    cd ${outDir}; \
    for file in $(find ../src -type f ! -name "*.ts" -printf '%P\n'); do \
      path=./$(dirname $file); \
      mkdir -p $path; \
      cp ../src/$file $path; \
    done; \
    zip -r ../${uuid}.shell-extension.zip *
  `, cb)

exports.pack = series( clean, require('./build').build, zip)