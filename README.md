#Simple Docker Continuous Deployment
Super simple Continous deployment server for people familiar with Docker.

## Setup
0. I assume that you are using jwilder/nginx-proxy
1. Clone
2. Update settings file with projects you want to setup
3. Update docker-compose.yml
 - volumes to your project
 - volumes to your deployment ssh key
4. docker-compose up on your server
5. hit http://virtual_host/:project_name

## Settings
Using the settings.json file, you can define projects and their pathname, and command to run. When you hit the GET '/:project_name' path, the command will run from the directory set in the path.

```
{
  "staging.project": {
    "path": "/Users/uptown/Projects/staging.project",
    "command": "git pull && docker-compose kill && docker-compose up -d"
  }
}

```

## docker-compose
Only thing that needs update here is the virtual host (ie: i'm using cd.docker), the project path(ie: /Users/uptown/Projects/...), and location to your git deployment key (ie: .ssh/)

```
app:
  build: ./
  command: npm run dev
  environment:
  - VIRTUAL_HOST=cd.docker
  volumes:
  - /var/run/docker.sock:/var/run/docker.sock
  - ./:/app
  - /Users/uptown/Projects/staging.project:/Users/uptown/Projects/staging.project
  - /Users/uptown/.ssh:/root/.ssh

```

## Optional settings

### Payload
If you want your command to only execute given a certain condition against the payload. For example, checking against the branch name. In bitbucket's case, the branch name is sent as part of the payload

```
// bitbucket payload
{
  "new": {
    "name": "staging"
    ...
  }
  ...
```

In our settings file we can adjust the condition for when we can fire by adding in payload object.
```
{
  "staging.project": {
    "path": "/Users/uptown/Projects/staging.project",
    "command": "git pull && docker-compose kill && docker-compose up -d",
    "payload": {
      "new.name": "staging"
    }
  }
}
```