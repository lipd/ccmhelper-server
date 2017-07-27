# Models

## Message

```js
{
  time: Date,
  title: String,
  author: String,
  content: String
}
```

## Topic

```js
{
  author: String,
  avatarUrl: String,
  content: String,
  attentionCount: Number,
  time: Date,
  answers: [ _Answer ]
}
```

## Answer

```js
{
  author: String,
  avatarUrl: String,
  content: String,
  vote: Number,
  time: Date,
  comments: [ Comment ],
  topic: _Topic,
}
```

## Comment

```js
{
  author: String,
  call: String,
  avatarUrl: String,
  content: String,
  vote: Number,
  time: Date
}
```