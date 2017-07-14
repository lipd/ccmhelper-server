# Curl

## Test `GET /messages`
`curl localhost:3000/messages`

## Test `Post /message`
`curl -H "Content-Type: application/json" -X POST -d '<data>' http://localhost:3000/message`

Example:
```bash
curl -H "Content-Type: application/json" -X POST -d '{"title": "开学通知", "author": "教务处", "content": "9月4号开学报到，请大家及时到校"}' http://localhost:3000/message
```