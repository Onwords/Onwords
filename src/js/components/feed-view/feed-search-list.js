var React = require('react');
var FeedSearchFollowButton = require('./feed-search-follow-button');

var FeedSearchList = React.createClass({
  getInitialState: function() {
    return {
      results: [],
      ownId: ''
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.fullName) {
      var url = 'https://test2server.herokuapp.com/api/search/users';
      var ownId = window.localStorage.getItem('user_id');

      var queryParameters = {
        full_name: nextProps.fullName,
        user_id: ownId
      };

      $.get(url, queryParameters)
        .done(function(data) {
          this.setState({results: data});
        }.bind(this));
    }
  },

  handleFollowClick: function(personId) {
    var url = 'https://test2server.herokuapp.com/api/users/follow';

    var body = {
      user_id: personId,
      follower_id: this.props.ownId
    };

    $.post(url, body);
  },

  handleUnfollowClick: function(personId) {
    var urlPrefix = 'https://test2server.herokuapp.com/api/users/unfollow';
    var url = urlPrefix + '?user_id=' + personId +'&follower_id=' + this.props.ownId;

    $.ajax({
      method: "DELETE",
      url: url
    });
  },

  render: function() {
    var feedSearchResults = this.state.results.map(function(result, index) {
      var personId = result.person_id;
      var picUrl = result.pic_url;
      var fullName = result.full_name;
      var isFollowing = result.is_following;

      return (
        <li className="feed-search-result" key={index}>
          <div className="feed-search-img"><img src={picUrl} /></div>
          <div className="feed-search-name">{fullName}</div>
          <FeedSearchFollowButton
           onFollowClick={this.handleFollowClick}
           onUnfollowClick={this.handleUnfollowClick}
           personId={personId}
           isFollowing={isFollowing}
           ownId={this.props.ownId} />
        </li>
      );
    }.bind(this));

    return (
      <ul className='feed-search-results'>
        {feedSearchResults}
      </ul>
    );
  }
});

module.exports = FeedSearchList;