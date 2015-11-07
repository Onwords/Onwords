var React = require('react');
var MyAnnotationsLink = require('./feed-my-annotations-link');

var MyAnnotations = React.createClass({
  getInitialState: function() {
    return {
      info: []
    };
  },
  componentWillMount: function() {

  },
  componentDidMount: function() {
    console.log('MyAnnotations - componentDidMount');
    var user = window.localStorage.user_id;
    var uri = window.location.href.split("?")[0];
    var completeUri = 'https://test2server.herokuapp.com/api/personalfeed?user_id=' + user;
    $.get(completeUri, function(result) {
      if (this.isMounted()) {
        this.setState({
          info: result
        });
      }
      console.log('MyAnnotations state:INFO = ', this.state.info);
    }.bind(this));

    $(document).on('click', '.redirectLink', function(e) {
      var url = $(this).attr('href');
      window.open(url, '_blank');  
    });
  },
  componentWillUnmount: function() {
    console.log('MyAnnotationsLink - componentWillUnmount');
    $(document).off();
  },
  render: function() {
    return (
      <div className='feed-my-annotations-container'>
        <MyAnnotationsLink info={this.state.info} />
      </div>
    );
  }
});

module.exports = MyAnnotations;
