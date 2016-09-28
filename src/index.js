const express = require('express'),
  exec = require('child_process').exec,
  os = require("os");

const app = express()
const settings = require('../settings.json')
console.log(os.tmpdir(), process.env.TMPDIR)
app.listen(3000)

app.get('/', (req,res) => {
  res.send('specify project name')
})

app.get('/:name', (req,res) => {
  var name = req.params.name,
    setting = settings[name]

  if (!setting) return res.send("setting not found")

  res.send({ setting })

  exec( setting.command, {
    cwd: setting.path
  }, (err, stdout, stderr) => {
    console.log('command response:::', stdout, stderr)
  })
})


