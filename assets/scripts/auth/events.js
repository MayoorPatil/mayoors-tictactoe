const getFormFields = require('../../../lib/get-form-fields')
const api = require('../auth/api')
const ui = require('../auth/ui')
const helper = require('./helper')

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

const onSignUpToggle = function (event) {
  event.preventDefault()
  helper.setSignUpToggleShowHide()
}

const onSignInToggle = function (event) {
  event.preventDefault()
  helper.setSignInToggleShowHide()
}

const onChangePwdButton = function (event) {
  event.preventDefault()
  helper.setOnChangePwdShowHide()
}

const addAuthHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-up-toggle').on('click', onSignUpToggle)
  $('#sign-in-toggle').on('click', onSignInToggle)
  $('#change-pwd-btn').on('click', onChangePwdButton)
}

module.exports = {
  addAuthHandlers
}
