var React = require('react');

var FeedSearchFollowButton = React.createClass({
  getInitialState: function() {
    return {
      isFollowing: this.props.isFollowing
    };
  },

  componentDidMount: function() {
    console.log('FeedSearchFollowButton mounted');
  },

  handleFollowClick: function() {
    this.props.onFollowClick(this.props.personId);
    this.setState({isFollowing: true});
  },

  handleUnfollowClick: function() {
    this.props.onUnfollowClick(this.props.personId);
    this.setState({isFollowing: false});
  },

  render: function() {
    var follow = <button onClick={this.handleFollowClick} className="feed-search-follow">
                    Follow
                 </button>;
    var following = <button 
                     className="feed-search-following"
                     onClick={this.handleUnfollowClick}>
                      <span className="following-text">Following</span>
                      <span className="unfollow-text">Unfollow</span>
                    </button>;
    var isSelf = <div>Look who it is!</div>;
    if (this.props.personId === this.props.ownId) {
      return isSelf;
    }
    return this.state.isFollowing ? following : follow;
  }
});

module.exports = FeedSearchFollowButton;