const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store.js')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('#content').text('Info Entered: Email-' + data.credentials.email)
  $('#signUpModal').modal('hide')
  store.playerX.push(true)
}

const rowCheck = function (list) {
  const myList = []
  for (let i = 0; i < list.length; i++) {
    if (list[0] === '3') {
      myList.push(store.answers[1][i])
    } else if (list[0] === '6') {
      myList.push(store.answers[2][i])
    } else {
      myList.push(store.answers[list[0]][i])
    }
  }
  return myList.toString() === list.toString()
}

const colCheck = function (list) {
  const myList = []
  for (let i = 0; i < list.length; i++) {
    if (list[0] === '1') {
      myList.push(store.answers[4][i])
    } else if (list[0] === '2') {
      myList.push(store.answers[5][i])
    } else {
      myList.push(store.answers[3][i])
    }
  }
  return myList.toString() === list.toString()
}

const diagCheck = function (list) {
  const myList = []
  for (let i = 0; i < list.length; i++) {
    if (list[0] === '6') {
      myList.push(store.answers[7][i])
    } else {
      myList.push(store.answers[6][i])
    }
  }
  return myList.toString() === list.toString()
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
  let winningCombo = []
  let winArr = []
  if (xsString.length >= 3) {
    for (let i = 0; i < xsString.length; i++) {
      for (let j = i + 1; j < xsString.length; j++) {
        for (let k = j + 1; k < xsString.length; k++) {
          if (xsString[i] === answerString[xsString[i]] && xsString[j] === answerString[xsString[j]] && xsString[k] === answerString[xsString[k]]) {
            winningCombo += xsString[i] + xsString[j] + xsString[k]
            winArr.push(xsString[i], xsString[j], xsString[k])
            if (answerString.includes(store.winningCombo) && (rowCheck(winArr) || colCheck(winArr) || diagCheck(winArr))) {
              i = xsString.length
              j = xsString.length
              k = xsString.length
              break
            } else {
              if (xsString.length > 3) {
                winArr = []
                winningCombo = ''
                if (xsString[i] === '0') {
                  store.answers[6].filter(function (element) {
                    if (xsString.includes(element.toString())) {
                      winArr.push(element)
                    }
                  })
                } else {
                  store.answers[7].filter(function (element) {
                    if (xsString.includes(element.toString())) {
                      winArr.push(element)
                    }
                  })
                }
                winningCombo = winArr[0].toString() + winArr[1].toString() + winArr[2].toString()
                i = xsString.length
                j = xsString.length
                k = xsString.length
                break
              } else {
                winningCombo = ''
              }
            }
          }
        }
        winArr = []
      }
    }
  }
  if (winningCombo.length === 3) {
    $('#result').text('Winning combination is - ' + winningCombo)
    for (let i = 0; i < winningCombo.length; i++) {
      $('#' + winningCombo.substring(i, i + 1)).css('background-color', 'green')
    }
  }
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
