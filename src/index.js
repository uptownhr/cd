const express = require('express'),
  exec = require('child_process').exec,
  os = require("os"),
  bodyParser = require('body-parser'),
  objectPath = require('object-path');

const app = express()

app.use(bodyParser.json())
app.listen(3000)

const settings = require('../settings.json')

app.get('/', (req,res) => {
  res.send('specify project name')
})

app.post('/:name', (req,res) => {
  var name = req.params.name,
    setting = settings[name],
    payload = objectPath(req.body)

  if (!setting) return res.send("setting not found")

  if (setting.payload) {
    console.log('payload')
    var keys = Object.keys(setting.payload)

    var match = keys.some( key => {
      return payload.get(key) == setting.payload[key]
    })


    if (!match) return res.send("payload match error")
  }

  res.send({ setting })

  exec( setting.command, {
    cwd: setting.path
  }, (err, stdout, stderr) => {
    console.log('command response:::', err, stdout, stderr)
  })
})