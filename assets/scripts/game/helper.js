'use strict'
const store = require('../store.js')

const resetBoard = function () {
  store.userInputs = {}
  store.xsString = ''
  store.osString = ''
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

const updateUIAndStore = function (event, player) {
  if (player === 'X') {
    event.target.textContent = 'X'
    $('#infoMessage').text('O\'s turn')
    store.xsString += event.target.id
    store.occupiedCells.push(event.target.id)
    store.userInputs[event.target.id] = 'X'
    store.playerX.push(!store.playerX.pop())
  } else {
    event.target.textContent = 'O'
    $('#infoMessage').text('X\'s turn')
    store.osString += event.target.id
    store.occupiedCells.push(event.target.id)
    store.userInputs[event.target.id] = 'O'
    store.playerX.push(!store.playerX.pop())
  }
}

module.exports = {
  getPatchCellInfoData,
  resetBoard,
  updateUIAndStore
}
