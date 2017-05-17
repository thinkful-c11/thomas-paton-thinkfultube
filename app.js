// AppState
appState = {
  results: [],
  nextPage: '',
  previousPage: '',
};




// State Modifications
function getDataFromApi(searchTerm, callback, token=null) {
  const YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  const query = {
    part: 'snippet',
    key: 'AIzaSyD10e_Q_yFL_HoW1r8-ivtbJf-XctTa1lM',
    q: searchTerm,
    pageToken: token,
  }
  $.getJSON(YT_BASE_URL, query, callback);
};

function storeData(data) {
  	if (data["items"]) {
      appState.results = data["items"];
      appState.nextPage = data["nextPageToken"];
      appState.previousPage = data["prevPageToken"];
    }
  	else {appState.results = 'no results'}
    displayYtResults(appState, $('.js-video-list'));
  };


//Callback function to update appState.results


// Render Function
function displayYtResults(state, element) {
  const videoHTML = state.results.map(function(obj){
  	return `<div class="blog-post">
        	    <h3>${obj.snippet.title}</h3>
        	    <a href='https://www.youtube.com/watch?v=${obj.id.videoId}'><img class="thumbnail" src="${obj.snippet.thumbnails.high.url}"></a>
        	    <p>${obj.snippet.description}</p>
        	    <div class="callout">
       		     <ul class="menu simple">
          		   <li><a href="https://www.youtube.com/channel/${obj.snippet.channelId}">${obj.snippet.channelTitle}</a></li>
    		       </ul>
              </div>
  	        </div>`
  });

  const noResults = '<p>No results</p>'

  if (state.results === 'no results') {element.html(noResults);}
  else {element.html(videoHTML);}
};

// Event Listeners
$(function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    const query = $(this).find('.js-query').val();
    getDataFromApi(query, storeData);
    // displayYtResults(appState, $('.js-video-list'));
  });
});
