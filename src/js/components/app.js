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
      showAnnotatorButton: true,
      showAnnotatorView: false,
      showFeedView: false,
      showFriendsAnnotations: false,
      spotlight: '',
      annotations: []
    };
  },
  
  // componentDidUpdate: function() {
  //   debugger;
  //     console.log('App componentDidUpdate', this.state.showFriendsAnnotations);
  //     var THIS = this;
  //     $(document).on('click', '.annotator-hl', function() {
  //       THIS.updateView('showAnnotatorView');
  //     });

  //   // $(document).on('keyup', function(e){
  //   //   if (e.which == 27) { 
  //   //     console.log('ESCAPE KEY PRESSED!');
  //   //     $('.annotator-cancel').trigger('click');
  //   //   }    
  //   // });
  // },
  updateView: function(action){
    var duration = 200;

    switch(action) {
        case 'showAnnotatorButton':
            console.log('showAnnotatorButton!!');
            this.setState({showFriendsAnnotations: false});
            this.setState({showAnnotatorButton: true});
            this.setState({showAnnotatorView: false});
            this.setState({showFeedView: false});
            $('#annotation-sidebar').animate({right: -(565)}, 200);
            this.setState({spotlight: ''});
            break;
        // case 'showFriendsAnnotations':
        //     console.log('showFriendsAnnotations!!');
        //     this.setState({showFriendsAnnotations: true});
        //     this.setState({showAnnotatorButton: false});
        //     this.setState({showAnnotatorView: false});
        //     this.setState({showFeedView: false});
        //     $('.annotation-sidebar').animate({right: -(300)}, 50);
        //     break;
        case 'showAnnotatorView':
          debugger;
            this.setState({showFriendsAnnotations: true});
            this.setState({showAnnotatorButton: false});
            this.setState({showAnnotatorView: false});
            this.setState({showFeedView: false});
            $('#annotation-sidebar').animate({right: -(300)}, 100);
            break;
        case 'showFeedView':
            this.setState({showFriendsAnnotations: false});
            this.setState({showAnnotatorButton: false});
            this.setState({showAnnotatorView: false});
            this.setState({showFeedView: true});
            this.setState({spotlight: ''});
            $('#annotation-sidebar').animate({right: (0)}, duration);
            break;
        default:
            console.log('nothing happened')
    }
  },

  componentDidMount: function() {
    // console.log('App componentWillMount');
    // debugger;
    // var THIS = this;
    // $(document).on('click', '.annotator-hl', function() {
    //   THIS.updateView('showAnnotatorView');
    // });
    var self = this;
    document.addEventListener('spotlightAnnotation', function(e) {
      debugger;
      self.setState({spotlight: e.detail.targetAnnotation});
      if (!self.state.showFriendsAnnotations) {
        debugger;
        self.updateView('showAnnotatorView');
      }
      console.log('spotlight this annotation:', e.detail.targetAnnotation);
    });


    debugger;

    /////////////////////////
    var uri = window.location.href.split("?")[0];
    if (uri.substring(uri.length-11) === 'onwords1991') {
      uri = uri.substring(0, uri.length-13);
    } else {
      uri = uri;
    }

    chrome.storage.onChanged.addListener(function(changes) {
      debugger;
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
            // if (intersection[newAnnotations[i].id !== undefined]) {
              intersection[newAnnotations[i].id] = true;
            // }
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
    /////////////////////////

  },

  changeSpotlight: function(annotation) {
    debugger;
    this.setState({spotlight: annotation});
  },

  render: function() {
    debugger;
    return (
      <div className='app-container'>      

          {this.state.showAnnotatorButton ? <AnnotatorButton updateView={this.updateView} /> : null}
        {this.state.showAnnotatorView ? <AnnotatorView updateView={this.updateView} /> : null}
        {this.state.showFeedView ? <FeedView updateView={this.updateView} /> : null} 

          {this.state.showFriendsAnnotations ? <FriendsAnnotations annotations={this.state.annotations} changeSpotlight={this.changeSpotlight} spotlight={this.state.spotlight} updateView={this.updateView} /> : null} 

      </div>
    );
  }
});

module.exports = App;
