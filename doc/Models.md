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

## Question

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
  question: _Question,
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