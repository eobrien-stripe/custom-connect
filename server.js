const express = require('express');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
// const path = require('path');
const dotenv = require('dotenv');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
dotenv.config();

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: {} })
  .write()

const port = process.env.PORT || 8080;

const app = express();
app.set('view engine', 'ejs');

const secret = "topsecret";
app.use(cookieParser(secret));
app.use(
  session({
    cookie: {maxAge: 60000},
    secret: secret,
    resave: true,
  })
)

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/seller', (req, res) => {
  res.render('seller', { user: req.session.user });
});

app.get('/login', (req, res) => {
  res.render('login', {user: req.session.user, message: null});
});

app.post('/login', (req, res) => {
  console.log(req.session);
  // return if already authenticated
  if(req.session.user) {
    res.redirect('/seller');
  }
  else {
  // return with message if no such user
    let user = db.get('users').find({ username: req.body.username }).value();
    if(user) {
      req.session.user = user;
      res.redirect('/seller');
    }
    else {
        res.render('login', {user: null, message: "no such user"});
    }
  }
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

// Catch 404 errors and forward to error handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(port, () => console.log(`custom-connect listening on port ${port}`));