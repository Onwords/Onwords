var React = require('react');
var MyLink = require('./feed-my-annotation-link');

var MyAnnotationsLink = React.createClass({
  render: function() {
    var handleClick = this.handleClick;
    var info = this.props.info;
    var user = window.localStorage.user_id;
    var urls = info.map(function(annotation, index) {
      return (
        <MyLink annotation={annotation} info={info} user={user} index={this.index} />
      );
    });
    return (
      <div className='my-annotations-links-container'>
        {urls}
      </div>
    )
  },
  componentDidMount: function() {
    console.log('MyAnnotationsLink - componentDidMount');
    $(document).on('click', '.redirectLink', function(e) {
      var url = $(this).attr('href');
      window.open(url, '_blank');  
    });
  },
  componentWillUnmount: function() {
    console.log('MyAnnotationsLink - componentWillUnmount');
    $(document).off();
  },
});

module.exports = MyAnnotationsLink;
