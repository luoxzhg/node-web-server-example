const express = require('express')
const path = require('path')
const util = require('util')
const initControllers = require('./controllers')

const server = express()
const port = parseInt(process.env.PORT) || 8080

async function start() {
    server.use(express.static(path.resolve('public')))
    server.use(await initControllers())

    await util.promisify(server.listen.bind(server, port))()
    console.log(`start listening on port ${port}`)

}

start()
