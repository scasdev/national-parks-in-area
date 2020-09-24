'use strict';

// https://www.googleapis.com/youtube/v3/search | SEARCHURL | ? | key=i6jg7Su8c8OSzFffVbcix8OC2dZwT4ZKHyFaEwZP | APIKEY | & | q=FL | QUERY | & | part=snippet | PART | & | maxResults=10 | MAXRESULTS | & | type=video | TYPE

//https://developer.nps.gov/api/v1/parks | SEARCHURL |  ? | stateCode=fl | QUERY | & | limit=10 | LIMIT | & | api_key=i6jg7Su8c8OSzFffVbcix8OC2dZwT4ZKHyFaEwZP | API_KEY

const apiKey = 'i6jg7Su8c8OSzFffVbcix8OC2dZwT4ZKHyFaEwZP'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

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

function getParks(query,maxResults=10) {
    const params = {
        stateCode: query,
        limit: maxResults,
        api_key: apiKey
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

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

