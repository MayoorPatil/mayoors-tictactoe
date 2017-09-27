#!/bin/bash

# sh scripts/sign-up-json.sh

# API="${API_ORIGIN:-http://httpbin.org}"
# URL_PATH="/post"
# EMAIL=m@m.com PASSWORD=map sh scripts/sign-up-json.sh
#`{"user":{"id":853,"email":"m@m.com"}}`
API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com}"
URL_PATH="/sign-up"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
