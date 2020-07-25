const express = require('express');
const request = require('request');

const PORT = process.env.PORT || 3050;
const app = express();
app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/magic', (req, res) => {
  url =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  request({ url: url }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: 'error', message: err.message });
    }

    res.json(JSON.parse(body));
  });
});

app.get('/', (req, res) => res.send('Hello World!'));
