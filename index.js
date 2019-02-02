var express = require('express');

let app = express();

app.set('views', './views') // specify the views directory
app.set('view engine', 'pug')

app.listen('6969', () => {
  console.log('listening at \nhttps://localhost:6969/');
})

app.get('/', (req, res) => {
  // res.render('index');
  res.sendFile('sample.html', {root: 'views'});
})

app.use('/game', express.static('game'))
