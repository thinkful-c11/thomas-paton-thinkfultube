// AppState
appState = {
  results: {},
};




// State Modifications
function getDataFromApi(state, searchTerm) {
  const YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  const callback = function storeData(data) {
  	if (data["items"]) {state.results = data["items"];}
  	else {state.results = 'no results'}
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
function displayYtResults(state, element) {
  const videoHTML = state.results.map(function(obj){
  	return `<div class="blog-post">
        	<h3>${obj.snippet.title}</h3>
        	<img class="thumbnail" src="${obj.snippet.thumbnail.high.url}">
        	<p>${obj.snippet.description}</p>
        	<div class="callout">
         		 <ul class="menu simple">
            		<li>${obj.snippet.channelTitle}</li>
          		</ul>
        	</div>`
  });
  
  const noResults = '<p>No results</p>'

if (state.results === 'no results') {element.html(noResults);}
else {element.html(videoHTML);}
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
