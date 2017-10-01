const store = require('../store.js')

const checkWinner = function () {
  const xsString = store.xsString
  const osString = store.osString

  let winnerCount = 0
  let winningCombo = []
  let xsoros = xsString
  if (xsoros.length >= 3) {
    for (let i = 0; i < 2; i++, xsoros = osString) {
      for (let j = 0; j < store.answers.length; j++) {
        winnerCount = 0
        winningCombo = []
        for (let k = 0; k < xsoros.length; k++) {
          if (store.answers[j].some(ele => ele === +xsoros[k])) {
            winnerCount += 1
            winningCombo.push(xsoros[k])
          }
        }
        if (winnerCount === 3) {
          j = 8
          i = 2
          store.winningCombo = winningCombo
          return true
        }
      }
    }
  }
}

const displayWinner = function (winner) {
  const winningCombo = store.winningCombo
  if (winningCombo.length === 3) {
    $('#infoMessage').text('Winner is - ' + $('#' + winningCombo[0]).text())
    $('#result').text('The winning cells are highlighted')
    for (let i = 0; i < winningCombo.length; i++) {
      $('#' + winningCombo[i]).css('background-color', 'green')
    }
  }
  winner ? store.over = true : store.over = false
  if (winner) { $('#re-start').removeClass('hidden') }
  if (!winner && store.occupiedCells.length === 9 && store.winningCombo.length < 3) {
    $('#infoMessage').text('It\'s a draw!!')
    store.over = true
    $('#result').text('Please click the start button to play another game')
    $('#re-start').removeClass('hidden')
  }
}

module.exports = {
  checkWinner,
  displayWinner
}
