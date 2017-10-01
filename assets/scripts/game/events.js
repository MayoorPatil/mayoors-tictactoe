const store = require('../store.js')
const checkAndDisplayWinner = require('./logic.js')
// const checkAndDisplayWinner = require('./newlogic.js')
const api = require('../auth/api')
const ui = require('../auth/ui')
const gameApi = require('./api')
const gameUi = require('./ui')
const helper = require('./helper')

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
  $('#content').text('Informational messages will be displayed here...')
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
    .then(gameUi.showStatsSuccess)
    .catch(gameUi.showStatsFailure)
}

const onUpdateCell = function (event) {
  event.preventDefault()
  if (store.player.id === undefined || store.reset) {
    if (store.reset) {
      $('#result').text('Please click start button to play another game')
    } else {
      $('#result').css({'color': 'teal'})
      $('#result').text('Please sign in to start playing the game')
    }
  } else {
    if (store.over) {
      $('#result').text('The game is over!! Please click the start button to play another game')
    } else {
      if (store.occupiedCells.length === 0) {
        // assume signed in user is player X
        helper.updateUIAndStore(event, 'X')
        $('#result').html('&nbsp;')
      } else {
        // check to see if the cell is already marked
        const marked = store.occupiedCells.find(marked => marked === event.target.id)
        if (marked === undefined) {
          // logic to toggle player
          if (store.playerX.includes(true)) {
            helper.updateUIAndStore(event, 'O')
          } else {
            helper.updateUIAndStore(event, 'X')
          }
        }
      }
      checkAndDisplayWinner.displayWinner(checkAndDisplayWinner.checkWinner())
      gameApi.patchCellInfo(event)
        .then(gameUi.patchCellInfoSuccess)
        .catch(gameUi.patchCellInfoFailure)
    }
  }
}

const addGameHandlers = function () {
  $('#sign-out-button').on('submit', onSignOut)
  $('.col-md-4').on('click', onUpdateCell)
  $('#sign-in-register').on('click', onSignInRegister)
  $('#re-start').on('click', onrestartGame)
  $('#show-stats').on('click', onShowStats)
}

module.exports = {
  addGameHandlers
}
