
import { getAllData } from './data_import.js';

function displayAnalysis(result, userInput){
  document.getElementById('score').innerHTML = result.score_tag;
  document.getElementById('agreement').innerHTML = result.agreement;
  document.getElementById('userSentence').innerHTML = userInput.slice(0, 7) + "..."
}

function displayErrorMessage(error){
  // document.getElementById('loading').innerHTML = error;
  document.getElementById('errorMsg').innerHTML = error;
}

function cleanDisplay(){
  document.getElementById('score').innerHTML = "";
  document.getElementById('agreement').innerHTML = "";
  document.getElementById('userSentence').innerHTML = "";
  document.getElementById('errorMsg').innerHTML = "";
}

function displayLoading(loader) {
  loader.classList.add("display"); //from https://dev.to/vaishnavme/displaying-loading-animation-on-fetch-api-calls-1e5m
}

function hideLoading(loader) {
  loader.classList.remove("display"); // from https://dev.to/vaishnavme/displaying-loading-animation-on-fetch-api-calls-1e5m
}


async function performAction(event){
  cleanDisplay();
  const uInput = document.getElementById('anText').value;
  console.log("uInput")
  const userText= document.getElementsByClassName("utext");
  const loader = document.getElementById('loading');
  // console.log("userText", userText);
  // console.log('uInput: ', uInput);
  displayLoading(loader);
  try{
    const answer = await getAllData("http://localhost:3000/analysedText", uInput);
    if (answer.status.code != 0) {
      displayErrorMessage(answer.status.msg);
    } else{
      displayAnalysis(answer, uInput);
      document.getElementById('anText').value = "";
    }
  } catch(error) {
    console.log("error :", error);
    displayErrorMessage(error);
  }
  hideLoading(loader);
}

function initializeForms() {
  document.getElementById('send').addEventListener('click', performAction);
}

export {initializeForms};

module.exports = initializeForms;
