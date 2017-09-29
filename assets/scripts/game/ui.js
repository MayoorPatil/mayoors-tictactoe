'use strict'

const store = require('../store.js')

const createGameSuccess = function (data) {
  $('#apiResult').text('Created game successfully - Start Playing!!')
  store.game = data.game
  $('#signUpModal').modal('hide')
}

const createGameFailure = function (error) {
  console.error(error)
  $('#apiResult').text('Please sign out and sign in again - ' + error.statusText)
}

const patchCellInfoSuccess = function (data) {
  $('#apiResult').text('Updated game successfully!!')
  store.game = data.game
}

const patchCellInfoFailure = function (error) {
  console.error(error)
  $('#apiResult').text('Some problem with updating the cell info - ' + error.statusText)
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  patchCellInfoSuccess,
  patchCellInfoFailure
}
