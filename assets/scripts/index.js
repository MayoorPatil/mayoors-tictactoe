'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

const gameEvents = require('./game/events.js')
const authEvents = require('./auth/events.js')

$(() => {
  gameEvents.addGameHandlers()
  authEvents.addAuthHandlers()
})
