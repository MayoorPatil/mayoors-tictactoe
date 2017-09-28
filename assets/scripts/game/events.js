const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store.js')
const checkWinner = require('./logic.js')
const api = require('../auth/api')
const ui = require('../auth/ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  if (store.user) {
    api.signOut()
      .then(ui.signOutSuccess)
      .catch(ui.signOutFailure)
  } else {
    $('#result').text('Please sign IN before you sign OUT!!')
  }
}

const onSignUpToggle = function (event) {
  event.preventDefault()
  $('#sign-up').removeClass('hidden')
  $('#sign-in-toggle').removeClass('hidden')
  $('#sign-in-toggle-text').removeClass('hidden')
  $('#sign-in').addClass('hidden')
  $('#sign-up-toggle').addClass('hidden')
  $('#sign-up-toggle-text').addClass('hidden')
}

const onSignInToggle = function (event) {
  event.preventDefault()
  $('#sign-in').removeClass('hidden')
  $('#sign-in-toggle').addClass('hidden')
  $('#sign-in-toggle-text').addClass('hidden')
  $('#sign-up').addClass('hidden')
  $('#sign-up-toggle').removeClass('hidden')
  $('#sign-up-toggle-text').removeClass('hidden')
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
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('.col-md-4').on('click', onUpdateCell)
  $('#sign-up-toggle').on('click', onSignUpToggle)
  $('#sign-in-toggle').on('click', onSignInToggle)
}

module.exports = {
  addHandlers
}
