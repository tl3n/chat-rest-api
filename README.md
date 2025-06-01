# chat-rest-api
REST API for primitive chat on Node.js using Fastify framework. Data is stored in PostgreSQL using Drizzle ORM. Implemented the following features:
- User registration using login and paswword (POST /account/register). Basic Authentication is used for auth
- Messages creation. There is only one chat for all of the users. Messages can be text (POST /message/text), files (POST /message/file).
- Receiving messages list with pagination (GET /message/list)
- Receiving message's content in raw format (GET /message/content)
- docker-compose.yml, which can be used to run the app
- OpenAPI documentation (GET /docs)
