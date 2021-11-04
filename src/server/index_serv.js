const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

app.use(cors());

const port = 3000;

const server = app.listen(port, listening);

function listening(){
  console.log('server runnning');
  console.log(`runnning on localhost ${port}`);
}
