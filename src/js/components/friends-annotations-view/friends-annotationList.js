var React = require('react');
var ReactAddons = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var AnnotationComment = require('../annotator-view/annotationComment');
var FriendAnnotationComment = require('./friends-annotationComment');


var friendsAnnotationList = React.createClass({
  getInitialState: function() {
    return {
      annotations: [],
      spotlight: '',
      spotlightOn: false,
      mounted: false
    }
  },

  deleteAnn: function(annotation) {
    var ev = new CustomEvent('deleteAnnotation', {detail: {
      targetAnnotation: annotation
    }});
    document.dispatchEvent(ev);
  },

  unhighlight: function() {
    debugger;
    var oldSpotlight = this.state.spotlight.id;
    var oldSpotlightColorWithUmph = $('span[data-annotation-id="' + oldSpotlight + '"]').css('background-color'); 
    if (oldSpotlightColorWithUmph) {
      var oldSpotlightColor = oldSpotlightColorWithUmph.slice(0, oldSpotlightColorWithUmph.length - 1) + ', 0.25)';
      var defaultColor = $('body').css('color');
      oldSpotlightColor = oldSpotlightColor.slice(0, oldSpotlightColor.indexOf('(')) + 'a' + oldSpotlightColor.slice(oldSpotlightColor.indexOf('('));
      var styles = {
        backgroundColor: oldSpotlightColor,
        color: defaultColor
      }
      $('span[data-annotation-id="' + oldSpotlight + '"]').css(styles);  
    }
  },

  highlight: function(annotation) {
    debugger;
    $('html, body').animate({
      scrollTop: annotation.offsetTop - 200
    }, 325);

    var newSpotlightColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color'); 

    var newSpotlightColorWithUmph = newSpotlightColor.slice(0, newSpotlightColor.lastIndexOf(',') + 1) + ' 1)';
    var styles = {
      backgroundColor: newSpotlightColorWithUmph,
      color: "black"
    }
    $('span[data-annotation-id="' + annotation.id + '"]').css(styles);  
    // this.setState({spotlight: annotation});
  },

  clickHandler: function(annotation) {
    debugger;
    this.props.changeSpotlight(annotation);
    

    // if (this.state.spotlight !== '' && this.state.spotlight.id !== annotation.id) {
    //   this.unhighlight();
    // }

    // if (this.state.spotlight.id === annotation.id) {
    //   if (!this.state.spotlightOn) {
    //     this.highlight(annotation);
    //   }
    // } else {
    //   this.highlight(annotation);
    // }
    // this.setState({spotlightOn: true});

  },

  componentWillMount: function() {
    debugger;
    var newSpotlight = '';
    if (this.props.spotlight !== '') {
      newSpotlight = this.props.spotlight;
      this.highlight(newSpotlight);
    };
    this.setState({annotations: this.props.annotations, spotlight: newSpotlight});
  },

  // componentDidMount: function() {
  //   debugger;
  //   if (this.state.spotlight !== '') {
  //     this.clickHandler(this.state.spotlight);
  //   }
  // },

  componentWillReceiveProps: function(nextProps) {
    debugger;
    // if (nextProps.spotlight !== this.state.spotlight && nextProps.spotlight !== '') {
    //   this.clickHandler(nextProps.spotlight);
    // } else if (nextProps.spotlight === '') {
    //   for (var i = 0; i < nextProps.annotations.length; i++) {
    //     if (nextProps.annotations[i].id === this.state.spotlight.id) {
    //       this.setState({spotlightOn: true});
    //       return;
    //     }
    //   }
    //   this.setState({spotlightOn: false, spotlight: ''});
    // } else if (nextProps.spotlight === this.state.spotlight) {
    //   this.props.changeSpotlight('');
    // }

    if (nextProps.spotlight !== this.state.spotlight) {
      if (this.state.spotlight !== '') {
        this.unhighlight();
      }
      if (nextProps.spotlight !== '') {
        this.highlight(nextProps.spotlight);
      }

    }

    this.setState({annotations: nextProps.annotations, spotlight: nextProps.spotlight});

  },

  componentWillUnmount: function() {
    debugger;
    if (this.state.spotlight !== '') {
      this.unhighlight();
      // this.setState({spotlightOn: false, spotlight: ''});
      this.props.changeSpotlight('');
    }
  },

  render: function() {
    console.log('hellloooooo, friendsAnnotationList:', this.props.friends);
    debugger;
    var ownId = window.localStorage.getItem('user_id');
    var friends = this.props.friends;
    var annotations = this.state.annotations;
    var self = this;


      var annotationList = annotations.map(function(annotation, index) {
        var user = annotation.user_id;
        console.log('INSIDE FRIEND ANNOTATION LIST: ', annotation.user_id);
          if (friends[user]) {
            console.log('annotation is:', annotation);
            return (
              <div key={index}>
                <li className="annotationListItem">
                  {user.toString() === ownId ? 
                    <AnnotationComment clickHandler={self.clickHandler} user={annotation.user_id} annotation={annotation} deleteAnn={self.deleteAnn} />
                  : <FriendAnnotationComment spotlight={self.state.spotlight} clickHandler={self.clickHandler} user={annotation.user} annotation={annotation}/>
                  }
                </li>
                <br></br>
              </div>
            )
          }
      });


    return (
      <div className="annotationList">

          
          {annotationList}


      </div>
    )
  },

  componentDidMount: function() {

  }
});

module.exports = friendsAnnotationList;
