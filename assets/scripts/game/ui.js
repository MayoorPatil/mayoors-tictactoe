'use strict'

const store = require('../store.js')
const helper = require('./helper')

const createGameSuccess = function (data) {
  $('#result').text('Signed in successfully, start playing!!')
  store.game = data.game
  $('#signUpModal').modal('hide')
}

const createGameFailure = function (error) {
  console.error(error)
  $('#result').text('Sorry, some problem with staring a new game, please signout and sign back in - ' + error.statusText)
}

const patchCellInfoSuccess = function (data) {
  store.game = data.game
}

const patchCellInfoFailure = function (error) {
  console.error(error)
}

const restartGameSuccess = function (data) {
  helper.resetBoard()
  $('#infoMessage').html('&nbsp;')
  $('#result').text('Enjoy the new game! Informational messages will be displayed here!!')
  store.game = data.game
  $('#re-start').addClass('hidden')
  store.reset = false
}

const restartGameFailure = function (error) {
  console.error(error)
  $('#result').text('Sorry, some problem with staring a new game, please signout and sign back in - ' + error.statusText)
}

const showStatsSuccess = function (data) {
  $('#stats-modal-title').text('Here are your stats - ' + store.player.email.substring(0, (store.player.email.indexOf('@'))))
  $('#stats-modal-body').removeClass('hidden')
  store.games = data.games
  const completedGames = []
  const notCompletedGames = []
  for (let i = 0; i < data.games.length; i++) {
    data.games[i].over ? completedGames.push(data.games[i]) : notCompletedGames.push(data.games[i])
  }
  $('#games-played').html('Games Played <span class="badge">' + data.games.length + '</span>')
  $('#games-completed').html('Games Completed <span class="badge">' + completedGames.length + '</span>')
  $('#games-not-completed').html('Games Not Completed <span class="badge">' + notCompletedGames.length + '</span>')
}

const showStatsFailure = function (error) {
  console.error(error)
  $('#stats-modal-title').text('Sorry, some problem with getting your stats, please try later - ' + error.statusText)
  $('#stats-modal-body').addClass('hidden')
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  patchCellInfoSuccess,
  patchCellInfoFailure,
  restartGameSuccess,
  restartGameFailure,
  showStatsSuccess,
  showStatsFailure
}
