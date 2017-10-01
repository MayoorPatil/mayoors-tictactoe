'use strict'

const store = {
  'occupiedCells': [],
  'playerX': [],
  'answers': [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  'xsString': [],
  'osString': [],
  'userInputs': {},
  'winningCombo': [],
  'game': {},
  'player': {},
  'user': {},
  'over': false,
  'reset': false,
  'games': {}
}

module.exports = store
