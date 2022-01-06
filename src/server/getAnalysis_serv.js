const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const baseURL = "https://api.meaningcloud.com/sentiment-2.1?url=";
const apiKey = "&key=" + process.env.API_KEY;
const lang = "&lang=auto";

function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']'); //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI fixes issues with apostrophe in path
}

async function getAnalysis(userInput){
  const fixedInput = fixedEncodeURI(userInput);
  const response = await fetch(baseURL+fixedInput+apiKey+lang);
  console.log("Serv_url: ", baseURL+fixedInput+apiKey+lang);
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

module.exports = getAnalysis; // tu module.exports - esportowanie funkcji do testowania;