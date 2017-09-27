#!/bin/bash

# sh scripts/sign-in-json.sh

# API="${API_ORIGIN:-http://httpbin.org}"
# URL_PATH="/post"
# EMAIL=m@m.com PASSWORD=map sh scripts/sign-in-json.sh
#`{"user":{"id":853,"email":"m@m.com","token":"BAhJIiU0MmFkYzUzYjNlOWQzMGJjYjE4NzAwMTczNGNkOTNiZgY6BkVG--62e82ee4ef0af3c515277e48d0047a6b3eebde10"}}`
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}"
URL_PATH="/sign-in"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
