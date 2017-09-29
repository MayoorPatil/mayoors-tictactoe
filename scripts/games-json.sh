#!/bin/bash

# ID=2 sh scripts/change-password-json.sh

# API="${API_ORIGIN:-http://httpbin.org}"
# URL_PATH="/patch?id=${ID}"
# TOKEN="BAhJIiVhZDY2YjY1ZDg0MGQ4YmU4NDEwMzkyZjM3M2RmNDI3OAY6BkVG--ce5efeb39b4fe9d346d33cb8bc3c3c8e3ec64228" sh scripts/games-json.sh
# {"game":{"id":10540,"cells":["","","","","","","","",""],"over":false,"player_x":{"id":853,"email":"m@m.com"},"player_o":null}}
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}"
URL_PATH="/games"
# Pass old password new password and token: BAhJIiVjNjFkYmVmMWNkNGFlMmEwNTUxNDRjMThjOTc1ODE2NwY6BkVG

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"

echo
