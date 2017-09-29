'use strict'
const store = require('../store.js')

const user = function (id, email, token) {
  this.id = id
  this.email = email
  this.token = token
  this.getId = function () {
    return this.getId
  }
  this.setId = function (id) {
    this.id = id
  }
  this.getEmail = function () {
    return this.email
  }
  this.setEmail = function (id) {
    this.id = email
  }
  this.getToken = function () {
    return this.email
  }
  this.setToken = function (id) {
    this.id = email
  }
}

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
    $('#' + i.toString()).text(i.toString())
    $('#' + i.toString()).css({'background-color': 'teal'})
  }
}

const getPatchCellInfoData = function (event) {
  // const cellInfoData = new Game(store.game.id, store.userInputs[event.target.id], [], store.winningCombo.length === 3, store.user, null)
  // cellInfoData.setId()
  // cellInfoData.setCell()
  // cellInfoData.setOver(store.winningCombo.length === 3)
  // cellInfoData.setPlayerX(store.user)
  const newInfo = {
    'game': {
      'id': store.game.id,
      'cell': {
        'index': event.target.id,
        'value': store.userInputs[event.target.id]
      },
      'over': store.winningCombo.length === 3,
      'player_x': {
        'id': store.user.id,
        'email': store.user.email
      },
      'player_o': null
    }
  }
  return newInfo
}

// const Game = function (id, cell, cells, bool, playerX, playerO) {
//   this.id = 0
//   this.cell = {}
//   this.cells = []
//   this.over = false
//   this.player_x = {}
//   this.player_o = null
//
//   this.getId = function () {
//     return this.id
//   }
//   this.setId = function (id) {
//     this.id = id
//   }
//   this.getCell = function () {
//     return this.cell
//   }
//   this.setCell = function (cell) {
//     this.cell = cell
//   }
//   this.getCells = function () {
//     return this.cells
//   }
//   this.setCells = function (cells) {
//     this.cells = cells
//   }
//   this.getOver = function () {
//     return this.over
//   }
//   this.setOver = function (bool) {
//     this.over = bool
//   }
//   this.getPlayerX = function () {
//     return this.player_x
//   }
//   this.setPlayerX = function (player) {
//     this.player_x = player
//   }
//   this.getPlayerO = function () {
//     return this.player_o
//   }
//   this.setPlayerO = function (player) {
//     this.player_o = player
//   }
// }
module.exports = {
  user,
  getPatchCellInfoData,
  resetBoard
}
