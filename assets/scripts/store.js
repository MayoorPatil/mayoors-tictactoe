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
  'answerString': '012345678036147258048246',
  'winningRows': [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ],
  'winningCols': [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ],
  'winningDiags': [
    [0, 4, 8],
    [2, 4, 6]
  ],
  'xsRow': {},
  'xsCol': {},
  'xsDiag': {},
  'userInputs': {},
  'xs': {},
  'os': {},
  'winningCombo': [],
  'game': {},
  'player': {},
  'user': {},
  'over': false,
  'reset': false,
  'games': {}
}

module.exports = store
