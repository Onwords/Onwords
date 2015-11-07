var React = require('react');
var ReactAddons = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var AnnotatorView = require('./annotator-view/annotator-view');
var FeedView = require('./feed-view/feed-view');
var AnnotatorButton = require('./annotator-view/annotator-button');
var FriendsAnnotations = require('./friends-annotations-view/friends-annotations-view');

var App = React.createClass({
  getInitialState: function() {
    return {
      showAnnotatorView: false,
      showFeedView: false,
      showFriendsAnnotations: false,
      spotlight: '',
      annotations: []
    };
  },
  
  updateView: function(action){
    var duration = 200;
    var self = this;

    switch(action) {
        case 'showAnnotatorButton':
            console.log('showAnnotatorButton!!');
            $('#annotation-sidebar').animate({right: -(610)}, 200, function() {
              self.setState({showFriendsAnnotations: false});
              self.setState({showAnnotatorView: false});
              self.setState({showFeedView: false});
              self.setState({spotlight: ''});
            });
            break;
        case 'showAnnotatorView':
            if (!this.state.showFeedView) {
              this.setState({showAnnotatorView: false});
              this.setState({showFeedView: false});
              this.setState({showFriendsAnnotations: true}, function() {
                $(function () {
                  $('#annotation-sidebar').animate({right: -(300)}, {queue: false, duration: 200});
                  $('#annotation-header').animate({width: '300px'}, {queue: false, duration: 200});
                })
              });
            } else {
              $(function () {
                $('#annotation-sidebar').animate({right: -(300)}, {queue: false, duration: 200});
                $('#annotation-header').animate({width: '300px'}, {queue: false, duration: 200});
              })
              .promise().done(function() {
                debugger;
                setTimeout(function() {
                  self.setState({showAnnotatorView: false});
                  self.setState({showFeedView: false});
                  self.setState({showFriendsAnnotations: true});
                }, 200)
              });
            }
            break;
        case 'showFeedView':
            $(function() {
              $('#annotation-sidebar').animate({right: (0)}, {queue: false, duration: 200});
              $('#annotation-header').animate({width: '630px'}, {queue: false, duration: 200})
            })
            .promise().done(function() {
                self.setState({spotlight: ''});
                self.setState({showFriendsAnnotations: false});
                self.setState({showAnnotatorView: false});
                self.setState({showFeedView: true});
              });
            break;
        default:
            console.log('nothing happened')
    }
  },

  componentDidMount: function() {
    var self = this;
    document.addEventListener('spotlightAnnotation', function(e) {
      self.setState({spotlight: e.detail.targetAnnotation});
      if (!self.state.showFriendsAnnotations) {
        self.updateView('showAnnotatorView');
      }
      console.log('spotlight this annotation:', e.detail.targetAnnotation);
    });

    var uri = window.location.href.split("?")[0];
    if (uri.substring(uri.length-11) === 'onwords1991') {
      uri = uri.substring(0, uri.length-13);
    } else {
      uri = uri;
    }

    chrome.storage.onChanged.addListener(function(changes) {
      if (changes[uri] && changes[uri].newValue !== undefined) {
        var newAnnotations = changes[uri].newValue;
        var oldAnnotations = self.state.annotations;
        var currentSpotlight = self.state.spotlight;

        if (newAnnotations.length === 0) {
          currentSpotlight = '';
        } else {
          var intersection = {};
          for (var i = 0; i < oldAnnotations.length; i++) {
            intersection[oldAnnotations[i].id] = false;
          };
          
          for (var i = 0; i < newAnnotations.length; i++) {
              intersection[newAnnotations[i].id] = true;
          }

          if (intersection[currentSpotlight.id]) {
            currentSpotlight = currentSpotlight;
          } else {
            currentSpotlight = '';
          }
        }

        
        self.setState({annotations: newAnnotations, spotlight: currentSpotlight});
      }
    });
  },

  changeSpotlight: function(annotation) {
    this.setState({spotlight: annotation});
  },

  render: function() {
    return (
      <div className='app-container'>      
        <AnnotatorButton updateView={this.updateView} />
        {this.state.showAnnotatorView ? <AnnotatorView updateView={this.updateView} /> : null}
        {this.state.showFeedView ? <FeedView updateView={this.updateView} /> : null} 
        {this.state.showFriendsAnnotations ? <FriendsAnnotations annotations={this.state.annotations} changeSpotlight={this.changeSpotlight} spotlight={this.state.spotlight} updateView={this.updateView} /> : null} 
      </div>
    );
  }
});

module.exports = App;
