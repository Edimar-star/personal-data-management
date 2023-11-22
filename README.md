# personal-data-management
Personal data management for the asignature of software design II.

## How to run
### Create image
```
docker build -t frontend .
```
### Run comand
```
docker run --name frontend --rm -e VITE_APP_DOCKER_PORT=3000 -e VITE_APP_URL=http://localhost:8000 -p 3000:3000 -d frontend
```

### Stop command
```
docker stop frontend
```