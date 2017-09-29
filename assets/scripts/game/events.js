const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store.js')
const checkWinner = require('./logic.js')
const api = require('../auth/api')
const ui = require('../auth/ui')
const gameApi = require('./api')
const gameUi = require('./ui')

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

const onChangePwdButton = function (event) {
  event.preventDefault()
  $('#sign-up').addClass('hidden')
  $('#sign-in-toggle').addClass('hidden')
  $('#sign-in-toggle-text').addClass('hidden')
  $('#sign-in').addClass('hidden')
  $('#sign-up-toggle').addClass('hidden')
  $('#sign-up-toggle-text').addClass('hidden')
  $('#change-password').removeClass('hidden')
  $('#signUpModalLabel').text('Change Password')
}

const onSignInRegister = function (event) {
  event.preventDefault()
  $('#sign-up').addClass('hidden')
  $('#sign-in-toggle').addClass('hidden')
  $('#sign-in-toggle-text').addClass('hidden')
  $('#sign-in').removeClass('hidden')
  $('#sign-up-toggle').removeClass('hidden')
  $('#sign-up-toggle-text').removeClass('hidden')
  $('#change-password').addClass('hidden')
  $('#signUpModalLabel').text('Sign In / Register')
}

const onrestartGame = function (event) {
  event.preventDefault()
  gameApi.createGame()
    .then(gameUi.restartGameSuccess)
    .catch(gameUi.restartGameFailure)
}

const onShowStats = function (event) {
  event.preventDefault()
  gameApi.getGames()
    .then(gameUi.getGamesSuccess)
    .catch(gameUi.getGamesFailure)
}

const onUpdateCell = function (event) {
  if (store.player.id === undefined || store.reset) {
    if (store.reset) {
      $('#result').text('Please click start button to play another game')
    } else {
      $('#result').css({'color': 'teal'})
      $('#result').text('Please sign IN to start the game!!')
    }
  } else {
    if (store.over) {
      $('#result').text('The game is over!! Please click the start button to play another game')
    } else {
      event.preventDefault()
      if (store.occupiedCells.length === 0) {
        // assume signed in user is player X
        event.target.textContent = 'X'
        store.occupiedCells.push(event.target.id)
        store.userInputs[event.target.id] = 'X'
        store.playerX.push(!store.playerX.pop())
      } else {
        // check to see if the cell is already marked
        const marked = store.occupiedCells.find(marked => marked === event.target.id)
        if (marked === undefined) {
          // logic to toggle player - can be refactored
          if (store.playerX.includes(true)) {
            event.target.textContent = 'O'
            store.occupiedCells.push(event.target.id)
            store.userInputs[event.target.id] = 'O'
            store.playerX.push(!store.playerX.pop())
          } else {
            event.target.textContent = 'X'
            store.occupiedCells.push(event.target.id)
            store.userInputs[event.target.id] = 'X'
            store.playerX.push(!store.playerX.pop())
          }
        }
      }
      const winner = checkWinner.checkWinnerX(store.answerString, store.winningDiags) || checkWinner.checkWinnerO(store.answerString, store.winningDiags)
      winner ? store.over = true : store.over = false
      if (winner) { $('#re-start').removeClass('hidden') }
      if (!winner && store.occupiedCells.length === 9 && store.winningCombo.length < 3) {
        $('#result').text('There is NO winner, it\'s a draw!!')
        store.over = true
        $('#re-start').removeClass('hidden')
      }
      gameApi.patchCellInfo(event)
        .then(gameUi.patchCellInfoSuccess)
        .catch(gameUi.patchCellInfoFailure)
    }
  }
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-button').on('submit', onSignOut)
  $('.col-md-4').on('click', onUpdateCell)
  $('#sign-up-toggle').on('click', onSignUpToggle)
  $('#sign-in-toggle').on('click', onSignInToggle)
  $('#change-pwd-btn').on('click', onChangePwdButton)
  $('#sign-in-register').on('click', onSignInRegister)
  $('#re-start').on('click', onrestartGame)
  $('#show-stats').on('click', onShowStats)
}

module.exports = {
  addHandlers
}
