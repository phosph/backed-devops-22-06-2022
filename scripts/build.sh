#!/usr/bin/env bash

echo "build BE" && (
  cd backend
  pipenv requirements > requirements.txt
  docker -build -t bd:be -f ./Dockerfile
  sleep 5
  echo ">> done."
);

echo "build FE" && (
  cd front-end
  if command -v pnpm &> /dev/null; then
    pnpm install
    pnpm run build
  else
    npm install
    npm run build
  fi
  sleep 5
  docker -build -t bd:fe -f ./Dockerfile
  sleep 5

  echo ">> done."
)
