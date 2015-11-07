var React = require('react');
var ReactAddons = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var AnnotationLink = require('./feed-friends-annotationlink');

var FriendsAnnotations = React.createClass({
  getInitialState: function() {
    return {
      info: []
    }
  },
  render: function() {
    return (
      <ReactCSSTransitionGroup transitionName='feedview' transitionLeaveTimeout={200}>
        <AnnotationLink info={this.state.info} />
      </ReactCSSTransitionGroup>
    );
  },
  componentWillUnmount: function() {
    console.log('MyAnnotationsLink - componentWillUnmount');
    $(document).off();
  },
  componentDidMount: function() {
    console.log('FriendsAnnotations - componentDidMount');
    var user = window.localStorage.user_id;
    var completeUri = 'https://test2server.herokuapp.com/api/homefeed?user_id=' + user;

    // get FriendsAnnotations info from database
    $.get(completeUri, function(result) {
      console.log('RESULT FROM API: ',result);
      if (this.isMounted()) {
        this.setState({
          info: result
        });
      }
      console.log('FriendsAnnotations state:INFO = ', this.state.info);
    }.bind(this));

    $(document).on('click', '.redirectLink', function(e) {
      var url = $(this).attr('href');
      window.open(url, '_blank');  
    });
  }
});

module.exports = FriendsAnnotations;
