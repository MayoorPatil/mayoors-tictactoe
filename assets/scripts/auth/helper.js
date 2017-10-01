const showSignUpToggle = function () {
  $('#sign-up-toggle').addClass('hidden')
  $('#sign-up-toggle-text').addClass('hidden')
}

const hideSignUpToggle = function () {
  $('#sign-up-toggle').removeClass('hidden')
  $('#sign-up-toggle-text').removeClass('hidden')
}

const showSignInToggle = function () {
  $('#sign-in-toggle').addClass('hidden')
  $('#sign-in-toggle-text').addClass('hidden')
}

const hideSignInToggle = function () {
  $('#sign-in-toggle').removeClass('hidden')
  $('#sign-in-toggle-text').removeClass('hidden')
}

const setSignUpToggleShowHide = function () {
  $('#sign-up').removeClass('hidden')
  hideSignInToggle()
  $('#sign-in').addClass('hidden')
  showSignUpToggle()
}

const setSignInToggleShowHide = function () {
  $('#sign-in').removeClass('hidden')
  showSignInToggle()
  $('#sign-up').addClass('hidden')
  hideSignUpToggle()
}

const setOnChangePwdShowHide = function () {
  $('#sign-up').addClass('hidden')
  showSignInToggle()
  $('#sign-in').addClass('hidden')
  showSignUpToggle()
  $('#change-password').removeClass('hidden')
  $('#signUpModalLabel').text('Change Password')
}

const setSignInSuccessShowHide = function () {
  $('#sign-out-button').removeClass('hidden')
  $('#change-pwd-btn').removeClass('hidden')
  $('#show-stats').removeClass('hidden')
}

const setChangePasswordSuccessShowHide = function () {
  showSignInToggle()
  $('#sign-in').addClass('hidden')
  $('#sign-up').removeClass('hidden')
  hideSignUpToggle()
}

const setSignOutSuccessShowHide = function () {
  $('#sign-out-button').addClass('hidden')
  $('#change-pwd-btn').addClass('hidden')
  $('#show-stats').addClass('hidden')
  $('#re-start').addClass('hidden')
}

const clearFormInputFields = function (formId) {
  if (formId !== 'change-password') {
    $('#' + formId + ' input:text').val('')
  }
  $('#' + formId + ' input:password').val('')
}

module.exports = {
  setSignUpToggleShowHide,
  setSignInToggleShowHide,
  setOnChangePwdShowHide,
  setSignInSuccessShowHide,
  setChangePasswordSuccessShowHide,
  setSignOutSuccessShowHide,
  clearFormInputFields
}
