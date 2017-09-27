const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store.js')
// Using your knowledge of jQuery write a function, onSubmitForm, that console
// logs the input in the input field when "save changes" is clicked

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#content').text('Info Entered: Email-' + data.credentials.email)
  $('#signUpModal').modal('hide')
  store.playerX.push(true)
}

const checkWinner = function (answerString, list) {
  const xsString = []
  Object.keys(store.userInputs).forEach((key) => {
    if (store.userInputs[key] === 'X') {
      store.xs[key] = true
    }
  })
  Object.keys(store.xs).forEach((key) => {
    xsString.push(key)
  })
  console.log('Xs entered so far...', xsString)
  let winningCombo = ''
  if (xsString.length >= 3) {
    console.log('inside....if')
    for (let i = 0; i < xsString.length; i++) {
      for (let j = i + 1; j < xsString.length; j++) {
        for (let k = j + 1; k < xsString.length; k++) {
          console.log('user values...' + xsString[i] + xsString[j] + xsString[k])
          console.log('answer values...' + answerString[i] + answerString[j] + answerString[k])
          if (xsString[i] === answerString[xsString[i]] && xsString[j] === answerString[xsString[j]] && xsString[k] === answerString[xsString[k]]) {
            winningCombo = xsString[i] + xsString[j] + xsString[k]
            break
          }
        }
      }
    }
  }
  console.log('winningCombo...', winningCombo)
}

const onUpdateCell = function (event) {
  // const data = getFormFields(this)
  event.preventDefault()
  if (store.occupiedCells.length === 0) {
    event.target.textContent = 'X'
    store.occupiedCells.push(event.target.id)
    store.userInputs[event.target.id] = 'X'
    store.playerX.push(!store.playerX.pop())
  } else {
    const marked = store.occupiedCells.find(marked => marked === event.target.id)
    if (marked === undefined) {
      if (store.playerX.includes(true)) {
        event.target.textContent = 'X'
        store.occupiedCells.push(event.target.id)
        store.userInputs[event.target.id] = 'X'
        store.playerX.push(!store.playerX.pop())
      } else {
        event.target.textContent = 'O'
        store.occupiedCells.push(event.target.id)
        store.userInputs[event.target.id] = 'O'
        store.playerX.push(!store.playerX.pop())
      }
    }
  // $('#content').text('Info Entered: Email-' + data.credentials.email)
  }
  checkWinner(store.answerString, store.winningDiags)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('.col-md-4').on('click', onUpdateCell)
}

module.exports = {
  addHandlers
}
