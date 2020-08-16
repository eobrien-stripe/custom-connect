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
  res.sendFile(path.join(__dirname,"public/index.html"));
});

app.listen(port, () => console.log(`custom-connect listening on port ${port}`));