'use strict'

const store = require('../store.js')
const gameApi = require('../game/api')
const gameUi = require('../game/ui')
const gameHelper = require('../game/helper')
const authHelper = require('./helper')

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
  authHelper.setSignInSuccessShowHide()
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
  authHelper.setChangePasswordSuccessShowHide()
  $('#signUpModalLabel').text('Sign In / Register')
  $('#signUpModal').modal('hide')
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#result').text(error.statusText)
}

const signOutSuccess = function () {
  store.user = {}
  store.player = {}
  gameHelper.resetBoard()
  store.reset = false
  $('#result').text('Signed out successfully!!')
  authHelper.setSignOutSuccessShowHide()
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
