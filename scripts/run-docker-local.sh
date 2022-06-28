#!/usr/bin/env bash

echo "build BE" && (
  cd backend
  pipenv requirements > requirements.txt
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

  echo ">> done."
)


docker-compose up --build --remove-orphans web be
