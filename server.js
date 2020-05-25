const express = require('express');
const http = require("http");
const path = require("path");
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3030;
const server = http.createServer(app);

app.use(express.static(__dirname + "/dist/miniburn"));
app.use(bodyParser.json());


app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + "/dist/miniburn", "index.html"));
})

app.post('/auth', (req,res) => {
  console.log('Got body: ', req.body);
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log("Server is running on " + port);
});

