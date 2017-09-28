'use strict'

const store = require('../store.js')

const signUpSuccess = function (data) {
  console.log(data)
  $('#result').text(data.user.email + ' signed up successfully!!')
  $('#signUpModal').modal('hide')
  $('#signUpModal').modal('hide')
}

const signUpFailure = function (error) {
  console.error(error)
  $('#result').text(error.responseText)
}

const signInSuccess = function (data) {
  console.log(data)
  $('#result').text('Signed in successfully!!')
  store.user = data.user
  $('#signUpModal').modal('hide')
}

const signInFailure = function (error) {
  console.error(error)
  $('#content').text('You may have entered wrong data - ' + error.statusText)
}

const changePasswordSuccess = function () {
  $('#result').text('Password updated successfully!!')
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('#result').text(error.statusText)
}

const signOutSuccess = function () {
  store.user = null // or empty object {}
  $('#result').text('Signed out successfully!!')
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
