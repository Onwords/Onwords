var React = require('react');

var MyLink = React.createClass({
  getInitialState: function() {
    return {
      showComments: false,
      showLikes: false, 
      annotation: [] 
    };
  },
  handleClick: function(e) {
    e.preventDefault();
    // console.log('stuff',this);
    var message = this.refs.postContent.getDOMNode().value;
    var uri = this.refs.uri.getDOMNode('a').href;
    var user = window.localStorage.user_id;
    console.log('USER ID!!!', user, message, uri);
    var generalPost = {
      uri: uri,
      user_id: user,
      generalPost: message 
    };

    // making it shared.
    $.ajax({
      url: 'https://test2server.herokuapp.com/api/personalfeed/share?user_id='+ user +' &uri='+ uri +'&is_shared='+'true',
      method: "put",
      dataType: 'json'
    });

    // updating general post.
    $.ajax({
      url: 'https://test2server.herokuapp.com/api/uri/gp',
      method: "post",
      data: generalPost,
      dataType: 'json'
    });
// /api/personalfeed/share?user_id=INTEGER&uri=STRING&is_shared=BOOLEAN
  },
  render: function() {
    console.log('in MyAnnotationsLink', this.props.annotation);
    var annotation = this.props.annotation;
    var numberOfLikes = annotation.likes.length;
    var redirectUri = annotation.uri_link;
    console.log(redirectUri);
    return (
      <div key={this.props.index} className='my-annotations-link-container'>
        <div className='my-annotations-title-container'>
          <a href={redirectUri} ref='uri' target='blank' className='redirectLink'>{annotation.title}</a>
        </div>
        <div className='my-annotations-likes-container'>
          Likes : {numberOfLikes}
        </div>
        <div className='my-annotations-form-container'>
          <form onSubmit={this.handleClick}>
              <input id='inputContent' type='text' placeholder='Write a comment...' ref='postContent' />
              <button type='submit'>Post</button>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = MyLink;
