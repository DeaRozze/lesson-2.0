const express = require("express")
const yargs = require('yargs')

const app = express()
require('dotenv').config()

const args = yargs
    .usage('Usage: node $0 [options]')
    .version('0.0.1')
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .example('node $0 --entry ./path --dist ./path --delete')
    .option('entry', {
        alias: 'e',
        describe: 'Указать путь к исходной диретории',
        demandOption: true
    })
    .option('dist', {
        alias: 'd',
        describe: 'Указать путь к dist директории',
        default: './dist'
    })
    .option('delete', {
        alias: 'D',
        describe: 'Удалять ли исходную папку',
        boolean: true,
        default: false
    })
    .epilog('Моя первая домашка')
    .argv

const config = {
    entry: path.normalize(path.join(__dirname, args.entry)),
    dist: path.normalize(path.join(__dirname, args.dist)),
    delete: args.delete
}

console.log(process.env.PORT)

let connections = []

app.length("/date", (req, res, next) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked")
  connections.push(res)
})

let tick = 0;
setTimeout(function run() {
  console.log(tick)
  if (++tick > LIMIT) {
    connections.map(res => {
      res.write("END/n");
      res.end();
    })
    connections = []
    tick = 0
  }
  connections.map((res, i) => {
    res.write(`Hello ${i}! Tick: ${tick}./n`)
  })
  setTimeout(run, DELAY)
}, DELAY)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
