function fetchToken() {
  debugger;

  var access_token;

  var clientID = '190161771316309';
  var redirectUri = 'https://' + chrome.runtime.id + '.chromiumapp.org/provider_cb';

  var options = {
    'interactive': true,
    url: 'https://www.facebook.com/dialog/oauth?client_id=' + clientID + '&response_type=token&access_type=online&redirect_uri=' + encodeURIComponent(redirectUri) 
  }

  chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
    debugger;

    if (chrome.runtime.lastError) {
      console.log(new Error(chrome.runtime.lastError));
      return;
    }
    
    var string = redirectUri.slice(redirectUri.indexOf('#')+1);
    var pairs = string.split('=');
    var token = pairs[1].split('&');
    var values = {};
    values[pairs[0]] = token[0];
    if (values.hasOwnProperty('access_token')) {
      access_token = values['access_token'];
      fetchFbProfile(access_token);
    }

    chrome.storage.sync.set({'access_token': access_token});
  });
}

chrome.storage.sync.clear();

chrome.browserAction.onClicked.addListener(function() {
  chrome.storage.sync.get('access_token', function(obj) {
    if (!obj['access_token']) {
      fetchToken();
    }
  });
});

function fetchFbProfile(accessToken) {
  var xhr = new XMLHttpRequest();
  var url = 'https://graph.facebook.com/v2.5/me/?fields=id,name,picture&access_token=' + accessToken;
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var resp = JSON.parse(xhr.responseText);
      var profile = {};
      profile.id = resp.id,
      profile.name = resp.name,
      profile.picUrl = resp.picture.data.url
    }
  }
  xhr.send();
};
