var React = require('react');

var AnnotationLinkComment = React.createClass({
  getInitialState: function() {
    return {
      comments: [] 
    };
  },
  componentWillMount: function() {
    
  },
  componentDidMount: function() {
    console.log('AnnotationLinkComment componentDidMount', this.props.comments);
    var THIS = this;
    // var uri = this.props.comments.uriLink;
    // $.get(this.props.source, function(comments) {
    //   console.log('COMMENTS!!', comments);
    //   if (THIS.isMounted()) {
    //     THIS.setState({
    //       comments: comments
    //     });
    //   }
    // }.bind(this));
  },
  render: function() {
    return (
      <div>
        comments! {this.props.post.comments.length}
      </div>
    );
  }
});

module.exports = AnnotationLinkComment;