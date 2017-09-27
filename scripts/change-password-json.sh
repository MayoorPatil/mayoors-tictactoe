#!/bin/bash

# ID=2 sh scripts/change-password-json.sh

# API="${API_ORIGIN:-http://httpbin.org}"
# URL_PATH="/patch?id=${ID}"
# ID=853 OLD_PASSWORD=map NEW_PASSWORD=maps TOKEN="BAhJIiU0MmFkYzUzYjNlOWQzMGJjYjE4NzAwMTczNGNkOTNiZgY6BkVG--62e82ee4ef0af3c515277e48d0047a6b3eebde10" sh scripts/change-password-json.sh
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}"
URL_PATH="/change-password/${ID}"
# Pass old password new password and token: BAhJIiVjNjFkYmVmMWNkNGFlMmEwNTUxNDRjMThjOTc1ODE2NwY6BkVG

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "passwords": {
      "old": "'"${OLD_PASSWORD}"'",
      "new": "'"${NEW_PASSWORD}"'"
    }
  }'

echo
