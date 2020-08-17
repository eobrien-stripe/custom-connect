const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
dotenv.config();

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: {} })
  .write()

const port = process.env.PORT || 8080;

const app = express();
app.set('view engine', 'ejs');



// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/seller', (req, res) => {
  res.render('seller', { user: null });
});

app.get('/login', (req, res) => {
  res.render('login', {user: null});
});

// Catch 404 errors and forward to error handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(port, () => console.log(`custom-connect listening on port ${port}`));