'use strict'

const store = require('../store.js')
const gameApi = require('../game/api')
const gameUi = require('../game/ui')
const gameHelper = require('../game/helper')
const authHelper = require('./helper')

const signUpSuccess = function (data) {
  $('#result').text(data.user.email + ' signed up successfully!!')
  authHelper.clearFormInputFields('sign-up')
  authHelper.clearFormInputFields('sign-in')
  authHelper.clearFormInputFields('change-password')
  $('#signUpModal').modal('hide')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#result').text(error.responseText)
  $('#content').text('Either email id is taken or passwords do not match. Please try again - ' + error.responseText)
}

const signInSuccess = function (data) {
  $('#result').text('Signed in successfully!!')
  store.user = data.user
  store.player = data.user
  authHelper.clearFormInputFields('sign-in')
  $('#signUpModal').modal('hide')
  $('#infoMessage').html('&nbsp;')
  authHelper.setSignInSuccessShowHide()
  $('#sign-in-register').addClass('hidden')
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
  authHelper.clearFormInputFields('change-password')
  $('#signUpModal').modal('hide')
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#content').text('Password NOT changed. Please ensure you enter the correct password - ' + error.statusText)
  $('#result').text(error.statusText)
}

const signOutSuccess = function () {
  store.user = {}
  store.player = {}
  gameHelper.resetBoard()
  store.reset = false
  $('#infoMessage').text('Please sign in to start playing')
  $('#result').text('Signed out successfully!!')
  $('#sign-in-register').removeClass('hidden')
  authHelper.setSignOutSuccessShowHide()
}

const signOutFailure = function (error) {
  console.error(error)
  $('#result').text('Sorry, some problem signing out, please try again - ' + error.statusText)
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
