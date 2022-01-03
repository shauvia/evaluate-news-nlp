const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const baseURL = "https://api.meaningcloud.com/sentiment-2.1?txt=";
const apiKey = process.env.API_KEY;
const lang = "&lang=auto";

async function getAnalysis(userInput){
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



export {getAnalysis};

module.exports = getAnalysis; // tu module.exports - esportowanie funkcji do testowania;