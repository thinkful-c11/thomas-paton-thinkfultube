// AppState
appState = {
  results: {},
};




// State Modifications
function getDataFromApi(state, searchTerm) {
  const YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  const callback = function storeData(data) {
    state.results = data;
  };
  const query = {
    part: 'snippet',
    key: 'AIzaSyD10e_Q_yFL_HoW1r8-ivtbJf-XctTa1lM',
    q: searchTerm,
  }
  $.getJSON(YT_BASE_URL, query, callback);
};

//Callback function to update appState.results


// Render Function
function displayOMDBSearchData(data) {
  var resultElement = '';
  if (data.Search) {
    data.Search.forEach(function(item) {
     resultElement += '<p>' + item.Title + '</p>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }

  $('.js-search-results').html(resultElement);
}

// Event Listeners
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayOMDBSearchData); // replace with State Mod
  });
}

$(function(){watchSubmit();});
