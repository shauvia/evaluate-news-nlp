async function getAllData(url, uInput) {
  // Wrapping string in an object sis needed when express body-pareser runs with srtrict=true
  let inputWrapper = { txt: uInput };
  console.log("Strigified: " + JSON.stringify(inputWrapper));
  let response = await fetch(url, { 
    method: 'POST' , 
    body: JSON.stringify(uInput),
    headers: {
      'Content-Type': 'application/json'
    }
  }); // domyslnie zapytanie GET
  console.log("Fetch returned:", response);
  if (!response.ok){
    if (response.status == 566){
      throw new Error("The server api.meaningcloud.com cannot handle this request at this time.");
    } else{
      throw new Error(response.statusText);
    }
  }
  let content = await response.json(); // dobranie sie do tresci jest asynchroniczne, trzeba czekac; .json() oddżejsonowuje
  console.log('content', content);
  return content;
  // jeśli moj server rzuca błędem 500 to rzucić wyjątkiem (throw error/exception) na fetchu z wiadomością statusText: "Internal Server Error"; patrz console.log(fetch returned)
   
}

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

document.getElementById('send').addEventListener('click', performAction);
