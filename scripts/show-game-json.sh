#!/bin/bash

# ID=2 sh scripts/change-password-json.sh

# API="${API_ORIGIN:-http://httpbin.org}"
# URL_PATH="/patch?id=${ID}"
# ID=12068 TOKEN="BAhJIiVkZGE0NGYxMzdmMWUzYjA0MTg2ZWE0NDhkZTZlNjBkMgY6BkVG--66f42bb1acd06e13c8fcbc44b2a315dfc63d63c4" sh scripts/show-game-json.sh
# {"game":{"id":10540,"cells":["","","","","","","","",""],"over":false,"player_x":{"id":853,"email":"m@m.com"},"player_o":null}}
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}"
URL_PATH="/games/$ID"
# Pass old password new password and token: BAhJIiVjNjFkYmVmMWNkNGFlMmEwNTUxNDRjMThjOTc1ODE2NwY6BkVG

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"

echo
