const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();

console.log(process.env);

const port = process.env.PORT || 8080;

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.listen(port, () => console.log(`custom-connect listening on port ${port}`));

if(process.env.USE_LIVERELOAD) {
  var livereload = require('livereload');
  var lrserver = livereload.createServer();
  lrserver.watch(__dirname + "/");
}