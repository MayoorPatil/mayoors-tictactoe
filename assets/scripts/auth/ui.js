'use strict'

const store = require('../store.js')
const gameApi = require('../game/api')
const gameUi = require('../game/ui')
const helper = require('../game/helper')

const signUpSuccess = function (data) {
  $('#result').text(data.user.email + ' signed up successfully!!')
  $('#signUpModal').modal('hide')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#result').text(error.responseText)
}

const signInSuccess = function (data) {
  $('#result').text('Signed in successfully!!')
  store.user = data.user
  store.player = data.user
  $('#signUpModal').modal('hide')
  $('#sign-out-button').removeClass('hidden')
  $('#change-pwd-btn').removeClass('hidden')
  $('#show-stats').removeClass('hidden')
  gameApi.createGame()
    .then(gameUi.createGameSuccess)
    .catch(gameUi.createGameFailure)
}

const signInFailure = function (error) {
  console.error(error)
  $('#content').text('You may have entered wrong data - ' + error.statusText)
}

const changePasswordSuccess = function () {
  $('#result').text('Password updated successfully!!')
  $('#sign-in-toggle').addClass('hidden')
  $('#sign-in-toggle-text').addClass('hidden')
  $('#sign-in').addClass('hidden')
  $('#sign-up').removeClass('hidden')
  $('#sign-up-toggle').removeClass('hidden')
  $('#sign-up-toggle-text').removeClass('hidden')
  $('#signUpModalLabel').text('Sign In / Register')
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#result').text(error.statusText)
}

const signOutSuccess = function () {
  store.user = {}
  store.player = {}
  helper.resetBoard()
  store.reset = false
  $('#result').text('Signed out successfully!!')
  $('#sign-out-button').addClass('hidden')
  $('#change-pwd-btn').addClass('hidden')
  $('#show-stats').addClass('hidden')
  $('#re-start').addClass('hidden')
}

const signOutFailure = function (error) {
  console.error(error)
  $('#result').text(error.statusText)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
