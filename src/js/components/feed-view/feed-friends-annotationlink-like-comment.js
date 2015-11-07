var React = require('react');
var AnnotationLinkComment = require('./feed-friends-annotationlink-comments');

var AnnotationLikesComment = React.createClass({
  getInitialState: function() {
    return {
      showComments: false 
    };
  },
  handleCommentClick: function(e) {
    console.log('showComments');
    // show comments

    if(this.state.showComments === false){
      this.setState({showComments : true});
    } else {
      this.setState({showComments : false});
    }
  },
  handleLikeClick: function() {
    console.log('likeClick!');
    // shange state to true and color image depending on what the current state is
    
    // make api call to server to change it there too.

  },
  render: function() {
    var THIS = this;
    return (
      <div>
        <div>
          <div className='post-likes-container' onClick={THIS.handleLikeClick}>
            likes : {this.props.post.likes.length}
          </div>

          <div className='post-comments-container' onClick={THIS.handleCommentClick}>
            comments : {this.props.post.comments.length} 
          </div>
        </div>

        <div>
          {this.state.showComments ? <AnnotationLinkComment {...this.props} /> : null}
        </div>
      </div>
    );
  }
});

module.exports = AnnotationLikesComment;