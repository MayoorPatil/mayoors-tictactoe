const store = require('../store.js')

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
    if (list[0] === '6' || list[0] === '2') {
      myList.push(store.answers[7][i])
    } else {
      myList.push(store.answers[6][i])
    }
  }
  return myList.toString() === list.toString()
}

const checkWinnerX = function (answerString, list) {
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
              // below if{} else{} is to ensure diagonal elements are checked in reverse
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
                // if the game is about to be a draw then winArr is less than 3
                if (winArr.length === 3) {
                  winningCombo = winArr[0].toString() + winArr[1].toString() + winArr[2].toString()
                  i = xsString.length
                  j = xsString.length
                  k = xsString.length
                  break
                }
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
    $('#infoMessage').text('Winner is - ' + $('#' + winningCombo.substring(0, 1)).text())
    $('#result').text('The winning cells are highlighted')
    for (let i = 0; i < winningCombo.length; i++) {
      $('#' + winningCombo.substring(i, i + 1)).css('background-color', 'green')
      store.winningCombo.push(winningCombo.substring(i, i + 1))
    }
    return true
  } else {
    return false
  }
}

const checkWinnerO = function (answerString, list) {
  const osString = []
  Object.keys(store.userInputs).forEach((key) => {
    if (store.userInputs[key] === 'O') {
      store.os[key] = true
    }
  })
  Object.keys(store.os).forEach((key) => {
    osString.push(key)
  })
  let winningCombo = []
  let winArr = []
  if (osString.length >= 3) {
    for (let i = 0; i < osString.length; i++) {
      for (let j = i + 1; j < osString.length; j++) {
        for (let k = j + 1; k < osString.length; k++) {
          if (osString[i] === answerString[osString[i]] && osString[j] === answerString[osString[j]] && osString[k] === answerString[osString[k]]) {
            winningCombo += osString[i] + osString[j] + osString[k]
            winArr.push(osString[i], osString[j], osString[k])
            if (answerString.includes(store.winningCombo) && (rowCheck(winArr) || colCheck(winArr) || diagCheck(winArr))) {
              i = osString.length
              j = osString.length
              k = osString.length
              break
            } else {
              if (osString.length > 3) {
                winArr = []
                winningCombo = ''
                if (osString[i] === '0') {
                  store.answers[6].filter(function (element) {
                    if (osString.includes(element.toString())) {
                      winArr.push(element)
                    }
                  })
                } else {
                  store.answers[7].filter(function (element) {
                    if (osString.includes(element.toString())) {
                      winArr.push(element)
                    }
                  })
                }
                if (winArr.length === 3) {
                  winningCombo = winArr[0].toString() + winArr[1].toString() + winArr[2].toString()
                  i = osString.length
                  j = osString.length
                  k = osString.length
                  break
                }
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
    $('#infoMessage').text('Winner is - ' + $('#' + winningCombo.substring(0, 1)).text())
    $('#result').text('The winning cells are highlighted')
    for (let i = 0; i < winningCombo.length; i++) {
      $('#' + winningCombo.substring(i, i + 1)).css('background-color', 'green')
      store.winningCombo.push(winningCombo.substring(i, i + 1))
    }
    return true
  } else {
    return false
  }
}

module.exports = {
  checkWinnerX,
  checkWinnerO
}
