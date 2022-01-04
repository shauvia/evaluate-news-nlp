const getAnalysis = require('./getAnalysis_serv.js');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded( {extended: false} ));
// strict:false is needed to accept raw string
app.use(bodyParser.json({strict:false}));

app.use(cors());
app.use(express.static('dist'));

// app.use(express.static('src/client'));

const port = 3000;

const server = app.listen(port, listening);

function listening(){
  console.log('server runnning');
  console.log(`runnning on localhost ${port}`);
}

app.post("/analysedText", async function(req, res){
  console.log("serv-req.body", req.body);
  try{
    let analysis = await getAnalysis(req.body);
    console.log("post-Analysis", analysis);
    res.send(analysis);
  }catch(error){
    if (error.isOutsideApiError) {
      res.status(566).send();
    } else {
    res.status(500).send();
    console.log("serv-error", error);
    }
  }  
});

// ustawić własny kod dla błędu zewnętrznego serwera, aby wyświetlał "Serwer api.meaningcloud.com nie może teraz obsłużyć tego żądania.";