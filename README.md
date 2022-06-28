# Challenge

### Frontend

página web hecha con ReactJS y Typescript

### Backend

API hecha con django

## Docker

se incluye un ficher Dockerfile tanto en BE (backend/[Dockerfile](./backend/Dockerfile)) como en FE (front-end/[Dockerfile](./front-end/Dockerfile)) y un fichero [docker-composer](./docker-composer)

## Scripts

- scripts/[build.sh](./scripts/build.sh)

  compila los docker con los siguientes tags

  - backend: `bd:be`
  - frontend: `bd:fe`

* scripts/[run-docker-local.sh](./scripts/run-docker-local.sh)

  compila y corre docker-compose levantando tanto el backend como el frontend.:

  - Backend http://localhost:8000
  - Frontend http://localhost:3000
