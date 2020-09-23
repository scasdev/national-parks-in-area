//api key
// i6jg7Su8c8OSzFffVbcix8OC2dZwT4ZKHyFaEwZP 
// curl -X GET "https://developer.nps.gov/api/v1/parks?stateCode=fl&limit=1&api_key=i6jg7Su8c8OSzFffVbcix8OC2dZwT4ZKHyFaEwZP" -H "accept: application/json"



/*
Requirements:
//The user must be able to search for parks in one or more states.

//The user must be able to set the max number of results, with a default of 10.

//The search must trigger a call to NPS's API.

The parks in the given state must be displayed on the page. 
Include at least:
Full name
Description
Website URL

The user must be able to make multiple searches and see only the results for the current search.
*/

'use strict';

const apiKey = 'i6jg7Su8c8OSzFffVbcix8OC2dZwT4ZKHyFaEwZP'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?stateCode=';


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the data array, stopping at the max number of results
  for (let i = 0; i < responseJson.data.length ; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(stateCode,maxResults=10) {
    console.log('GET URL RAN');
    const url = searchURL + stateCode + '&limit=' + maxResults + '&api_key=' + apiKey;
  
    console.log(url);
  
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.data[0].total == 0) {
            throw console.log('invalid state');
        } else if (maxResults <= 0 || maxResults > 10 ) {
            throw console.log('to few or too many results requested');
        } else {
            displayResults(responseJson)
        }
      })
      .catch(error => alert(`Invalid state or too many/few requested results. Try again.`))
  }
  

function watchForm() {
  //listen for submit 
   $('#js-form').submit(event => {
    event.preventDefault();
    //Accept value and submit
    const stateCode = $('#js-state-code').val();
    const maxResults = $('#js-max-results').val();
    console.log(stateCode);
    console.log(maxResults);
    getParks(stateCode, maxResults);
  });
  
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});

