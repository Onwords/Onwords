var App = require('./components/app');
var React = require('react');

console.log('inside main')
var renderComponents = function() {
  $('body').append("<div class='annotation-sidebar'></div>");
  $('.annotation-sidebar').append("<div id=scrollview></div>");

  React.render(<App />, document.getElementById('scrollview'));
}

chrome.storage.onChanged.addListener(function(changes) {
  console.log("inside addlistener", changes);
  if (changes.access_token.newValue) {
    console.log(changes.access_token.newValue);
  }
  renderComponents();
})

chrome.storage.sync.get('access_token', function(obj) {
  if (obj['access_token']) {
    renderComponents();
  }
})
