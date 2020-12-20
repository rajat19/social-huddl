## Social-Huddl

Social networking task for Huddl.ai

### Features
The project uses express js as framework and mongodb as the main database

### Install dependencies
```bash
npm i
```

### Starting the project
```bash
npm run start
```
The project will run on port **8080** by default. If any port is provided in `process.env.PORT` then this port will be used for serving the project

### Apis
Following are the apis supported in the project
- /api/v1/user
  - POST /signup    => User registration
    - body:
      - username
      - password
  - POST /login     => User login
    - body:
      - username
      - password
  - GET /:userId   => Get user details
    - param:
      - userId
- /api/v1/comment
  - GET /:userId    => Get all comments/subcomments for user's wall
    - param:
      - userId
  - POST /edit      => Edit comment/subcomment
    - body:
      - id
      - commentText
  - POST /          => Add new comment/subcomment
    - body:
      - authorId
      - wallId
      - commentText
      - parentId
  - DELETE /:commentId  => Delete comment
    - param:
      - commentId
- /api/v1/reaction
  - POST /          => Add reaction to a comment
    - body:
      - authorId
      - commentId
      - reaction

A [POSTMAN](postman/social-huddl.postman_collection.json) collection is also provided


## .env file
A `.env.example` file is already provided with the project. Change the name to `.env`.
If you have a mongo db installed in local.
Change configuration in this file. This will load up `process.env`  values;