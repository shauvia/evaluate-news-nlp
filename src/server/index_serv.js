const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.urlencoded( {extended: false} ));
// strict:false is needed to accept raw string
app.use(bodyParser.json({strict:false}));

app.use(cors());

// app.use(express.static('src/client'));

const port = 3000;

const server = app.listen(port, listening);

function listening(){
  console.log('server runnning');
  console.log(`runnning on localhost ${port}`);
}

const baseURL = "https://api.meaningcloud.com/sentiment-2.1?txt=";
const apiKey = "&key=";
const lang = "&lang=auto";

async function getAnalysis(baseURL,userInput, apiKey, lang){
  const response = await fetch(baseURL+userInput+apiKey+lang);
  console.log("Serv_url: ", baseURL+userInput+apiKey+lang);
  console.log("Serv-res: ", response);
  if (!response.ok){
    const errorToThrow = new Error();
    errorToThrow.isOutsideApiError = true;
    // errorToThrow.message = "Serwer api.meaningcloud.com nie może teraz obsłużyć tego żądania."
    throw errorToThrow;
  }
  const analysis = await response.json(); //oddżejsonowuje
  console.log("serv-analysis", analysis);
  return analysis;
}

app.post("/analysedText", async function(req, res){
  console.log("serv-req.body", req.body);
  try{
    let analysis = await getAnalysis(baseURL,req.body, apiKey, lang);
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