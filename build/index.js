const { run } = require('runjs')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')
run(`vue-cli-service build ${args}`)

