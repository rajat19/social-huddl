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

## .env file
A `.env.example` file is already provided with the project. Change the name to `.env`.
If you have a mongo db installed in local.
Change configuration in this file. This will load up `process.env`  values

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

A [POSTMAN](postman/social-huddl.postman_collection.json) collection is also provided. You can import this file in your postman. This would load all apis


### Curls For Apis [Detail]
- User registration
```bash
curl -L -X POST '127.0.0.1:8080/api/v1/user/signup' \
-H 'Content-Type: application/json' \
-d '{
    "username": "name1",
    "password": "pass1"
}'
```

- User login
```bash
curl -L -X POST '127.0.0.1:8080/api/v1/user/login' \
-H 'Content-Type: application/json' \
-d '{
    "username": "name1",
    "password": "pass1"
}'
```

- Get user details
> Change `token` in below url (as received from login/signup)<br>
> Replace `{userId}` with a proper user id
```bash
curl -L -X GET '127.0.0.1:8080/api/v1/user/{userId}' \
-H 'token: token1234'
```

- Add comment
> Change `token` in below url (as received from login/signup)<br>
> WallId and AuthorId are userIds <br>
> ParentId is parent comment id (can be null if this comment is not a subcomment)
```bash
curl -L -X POST '127.0.0.1:8080/api/v1/comment/' \
-H 'token: token1234' \
-H 'Content-Type: application/json' \
-d '{
    "commentText": "first comment",
    "wallId": "5fdf24ddf6ae7a3062825a8c",
    "authorId": "5fdf24ddf6ae7a3062825a8c",
    "parentId": "5fdf29267e2d28316aa19dd6"
}'
```

- Get comments
> Change `token` in below url (as received from login/signup)<br>
> Replace `{userId}` with a proper user id
```bash
curl -L -X GET '127.0.0.1:8080/api/v1/comment/{userId}' \
-H 'token: token1234'
```

- Delete comment/subcomment
> Change `token` in below url (as received from login/signup)<br>
> Replace `{commentId}` with a proper comment id<br>
> `token` should match comment's author, else not authorised to delete comment
```bash
curl -L -X DELETE '127.0.0.1:8080/api/v1/comment/{commentId}' \
-H 'token: token1234'
```

- Add Reaction
> Change `token` in below url (as received from login/signup)<br>
> `reaction` is a free text for now
```bash
curl -L -X POST '127.0.0.1:8080/api/v1/reaction/' \
-H 'token: token1234' \
-H 'Content-Type: application/json' \
-d '{
    "commentId": "5fdf295b7e2d28316aa19dd7",
    "authorId": "5fdf24ddf6ae7a3062825a8c",
    "reaction": "like"
}'
```