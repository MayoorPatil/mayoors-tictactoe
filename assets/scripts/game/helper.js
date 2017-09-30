'use strict'
const store = require('../store.js')

const resetBoard = function () {
  store.userInputs = {}
  store.xs = {}
  store.os = {}
  store.winningCombo = []
  store.game = {}
  store.over = false
  store.occupiedCells = []
  store.playerX = []
  store.reset = true
  for (let i = 0; i < 9; i++) {
    $('#' + i.toString()).html('&nbsp;')
    $('#' + i.toString()).css({'background-color': 'teal'})
  }
}

const getPatchCellInfoData = function (event) {
  const newInfo = {
    'game': {
      'id': store.game.id,
      'cell': {
        'index': event.target.id,
        'value': store.userInputs[event.target.id]
      },
      'over': store.over,
      'player_x': {
        'id': store.user.id,
        'email': store.user.email
      },
      'player_o': null
    }
  }
  return newInfo
}

module.exports = {
  getPatchCellInfoData,
  resetBoard
}
