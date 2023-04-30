/**  ******** Main Project File to Implement    ******** 
 *  This is a command line application that allows users to enter the name of 
 *  a dog breed and receive a short description of that breed.  The application 
 *  queries the 'thecatapi' via its JSON api.  
 */ 

const fetchBreedDescription = function (breedName, callback) {
  const request = require("request");
  const apiEndPoint = "https://api.thecatapi.com/v1/breeds/search?q=";

  request(apiEndPoint + breedName, (error, response, body) => {
    if (error) {
      callback(error, `We have an error accessing the API: ${apiEndPoint}`);
    }

    if (response.statusCode === 200) {
      const data = JSON.parse(body);
      if (data.length > 0) {
        const searchResult = `You searched for ${breedName}\n${constrainText(
          data[0].description,
          60
        )}`;
        callback(null, data[0].description);
      } else {
        callback(
          "Not Found",
          `We didn't find any feline breeds that matched your search of " ${breedName}`
        );
        return;
      }
    } else {
      callback(
        response.statusCode,
        `ERROR FETCHING DATA: ${response.statusCode}`
      );
    }
  });
};

const constrainText = function (inputText, textLength) {
  let outputString = "";
  for (let i = 0; i <= inputText.length; i++) {
    if (i % textLength === 0) {
      outputString += "\n";
    }
    outputString += inputText.charAt(i);
  }
  return outputString;
};

module.exports = { fetchBreedDescription };

