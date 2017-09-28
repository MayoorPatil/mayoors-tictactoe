const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store.js')
const checkWinner = require('./logic.js')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#content').text('Info Entered: Email-' + data.credentials.email)
  $('#signUpModal').modal('hide')
  store.playerX.push(true)
}

const onUpdateCell = function (event) {
  // const data = getFormFields(this)
  event.preventDefault()
  if (store.occupiedCells.length === 0) {
    event.target.textContent = 'X'
    store.occupiedCells.push(event.target.id)
    store.userInputs[event.target.id] = 'X'
    store.playerX.push(!store.playerX.pop())
  } else {
    const marked = store.occupiedCells.find(marked => marked === event.target.id)
    if (marked === undefined) {
      if (store.playerX.includes(true)) {
        event.target.textContent = 'X'
        store.occupiedCells.push(event.target.id)
        store.userInputs[event.target.id] = 'X'
        store.playerX.push(!store.playerX.pop())
      } else {
        event.target.textContent = 'O'
        store.occupiedCells.push(event.target.id)
        store.userInputs[event.target.id] = 'O'
        store.playerX.push(!store.playerX.pop())
      }
    }
  }
  const winner = checkWinner.checkWinnerX(store.answerString, store.winningDiags) || checkWinner.checkWinnerO(store.answerString, store.winningDiags)
  if (!winner && store.occupiedCells.length === 9 && store.winningCombo.length < 3) {
    $('#result').text('There is NO winner, it\'s a draw!!')
  }
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('.col-md-4').on('click', onUpdateCell)
}

module.exports = {
  addHandlers
}
