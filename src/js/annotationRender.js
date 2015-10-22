var React = require('React');

var renderAnnotations = function() {
  return {
    annotationsLoaded: function(ann) {
      console.log('annotation loaded', ann)
      // React.render(<App />, document.getElementById('scrollview'));
      $('.annotator-body-container').append("<div>"+ ann[0].quote + "</div>")
    }
  }
}

module.exports = renderAnnotations;