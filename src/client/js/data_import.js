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

export { getAllData };