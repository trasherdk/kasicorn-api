#!/bin/bash

source $(dirname $0)/../.env

# username (email) encoded
A1=$( echo "${API_BASIC_ID}" | base64 --wrap=0 )
echo "A1: $A1"
# password encoded
A2=$( echo "${API_BASIC_SECRET}" | base64 --wrap=0 )
echo "A2: $A2"

# encode together ecoded username and encoded password
AUTH1=$( echo "$A1:$A2" | base64 --wrap=0 )

# encoded ID and SECRET from protal encoded together
AUTH2=$( echo "${API_CONSUMER_ID}:${API_CONSUMER_SECRET}" | base64 --wrap=0 )

# unencoded username and password encoded together
AUTH3=$( echo "${API_BASIC_ID}:${API_BASIC_SECRET}" | base64 --wrap=0 )

B1=$(echo "${CONSUMER_ID}" | base64 --wrap=0)
echo "B1; $B1"
B2=$(echo "${CONSUMER_SECRET}" | base64 --wrap=0)
echo "B2; $B2"
AUTH4=$(echo "${B1}:${B2}" | base64 --wrap=0)

# concat ID and SECRET from protal unencoded together
AUTH5="${API_CONSUMER_ID}:${API_CONSUMER_SECRET}"

# choose one :)
case "$1" in
  '1') AUTH=$AUTH1 ;;
  '2') AUTH=$AUTH2 ;;
  '3') AUTH=$AUTH3 ;;
  '4') AUTH=$AUTH4 ;;
  '5') AUTH=$AUTH5 ;;
  *)
    echo "Select one: 1 2 3 4 5"
    exit 1
    ;;
esac

echo "Authorization: ($1) Basic ${AUTH}"

curl -X POST \
		-H "Authorization: Basic ${AUTH}" \
    --data  '{"grant_type": "client_credentials"}' \
    ${API_ENDPOINT}


#		-H 'cache-control: no-cache' \
#		-H 'Content-Type: application/x-www-form-urlencoded' \
#		-H 'x-test-mode: true' \
#		-H 'env-id : OAUTH2' \
