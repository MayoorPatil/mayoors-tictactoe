#!/bin/bash

# ID=2 sh scripts/sign-out.sh

# API="${API_ORIGIN:-http://httpbin.org}"
# URL_PATH="/delete?id=$ID"
# ID=853 TOKEN="BAhJIiU0MmFkYzUzYjNlOWQzMGJjYjE4NzAwMTczNGNkOTNiZgY6BkVG--62e82ee4ef0af3c515277e48d0047a6b3eebde10" sh scripts/sign-out-json.sh
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}"
URL_PATH="/sign-out/$ID"

curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"

echo
