#!/bin/bash

# ID=2 sh scripts/change-password-json.sh

# API="${API_ORIGIN:-http://httpbin.org}"
# URL_PATH="/patch?id=${ID}"
# TOKEN="BAhJIiU3YzdmZGM5YjM3ODRmODgyYzVjNzNkYzEwNWZhYTA2NAY6BkVG--0c2ae87d801c38cd8d85c8bf20613bc7d76062dd" sh scripts/create-game-json.sh
# {"game":{"id":10540,"cells":["","","","","","","","",""],"over":false,"player_x":{"id":853,"email":"m@m.com"},"player_o":null}}
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}"
URL_PATH="/games"
# Pass old password new password and token: BAhJIiVjNjFkYmVmMWNkNGFlMmEwNTUxNDRjMThjOTc1ODE2NwY6BkVG

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
  "game": {
    "id": 0,
    "cells": ["X","X","X","","O","","O","","O"],
    "over": false,
    "player_x": {
      "id": 853,
      "email": "m@m.com"
    },
    "player_o": null
  }
}'

echo
