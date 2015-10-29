var React = require('react');
var HomeButton = require('../annotator-view/home-button');
var AnnotatorMinimizeButton = require('../annotator-view/annotator-minimize-button');
var MyAnnotationsButton = require('./my-annotations-button');
var FriendAnnotationList = require('./friends-annotationList');

var FriendsAnnotationsView = React.createClass({
  getInitialState: function() {
    return {
      annotations: [],
      friends: {}
    }
  },
  componentWillMount: function() {
    console.log('friends annotaions mounted');
    var THIS = this;
    $(document).on('click', 'body', function(e) {
      console.log('e is : ', e);
      // highlighter click check
      if(getSelection().toString()) {
        return;
      }
      if($(e.target).attr('data-reactid')) {
        e.preventDefault();
        return;
      }
      if($(e.target).is('[class^="annotator-"]') || $(e.target).is('[id^="annotator-"]')) {
          e.preventDefault();
          return;
      }
      THIS.props.updateView('showAnnotatorButton');
    });
  },

  componentWillUnmount: function() {
    console.log('friends annotaions mounted unmounted');
    $(document).off();
  },

  toggleFriendAnnotations: function(id) {
    debugger;
    console.log('toggleFriendAnnotations: ', id)
    var friends = this.state.friends;

    if (!friends[id]) {
      var ev = new CustomEvent('getFriendAnnotations', {detail: {userId: id}});
      document.dispatchEvent(ev);
      friends[id] = true;
      console.log(friends[id], ' stored in chrome now')
    } else {
      friends[id] = false;
      var targetAnnotations = [];
      for (var i = 0; i < this.state.annotations.length; i++) {
        console.log(this.state.annotations[i]);
        if (this.state.annotations[i].user_id.toString() === id) {
          targetAnnotations.push(this.state.annotations[i]);
        }
      }
      var ev = new CustomEvent('deleteRender', {detail: {
        targetAnnotations: targetAnnotations
      }});
      document.dispatchEvent(ev);
    }
  },

  render: function() {
    var friendsArray = Object.keys(this.state.friends);
    var self = this;

    var friendCarousel = friendsArray.map(function(friend, index) {
      return (
        <div className='friends-pic' data-id={friend} onClick={self.toggleFriendAnnotations.bind(null, friend)}></div>
      )
    })

    console.log('inside-friendsview, annotations:', this.state.annotations)

    return (
      <div className='friends-annotations-view-container'>
        <div className='friends-annotations-buttons-container'>
          <AnnotatorMinimizeButton {...this.props} />
          <MyAnnotationsButton {...this.props} />
          <HomeButton {...this.props} />
        </div>

        <div className='friends-container'>
          {friendCarousel}
        </div>
        <div className='friends-annotations-list'>
          {this.state.annotations.length > 0 ? <FriendAnnotationList friends={this.state.friends} annotations={this.state.annotations}/> : null}
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    debugger;
    console.log('friend annotations view mounted');
    var self = this;
    var uri = window.location.href.split("?")[0];
    if (uri.substring(uri.length-11) === 'onwords1991') {
      user = uri.substring(uri.indexOf('#')+1, uri.length - 11);
      uri = uri.substring(0, uri.length-13);
    } else {
      user = window.localStorage.getItem('user_id');
      uri = uri;
    }
    $.get('https://onwords-test-server.herokuapp.com/api/search/uri', {uri: targetUri})
      .done(function(data) {
        debugger;
        var ownId = window.localStorage.getItem('user_id');
        var friends = {};
        for (var i = 0; i < data.rows.length; i++) {
          if (data.rows[i].user_id) {
              if (data.rows[i].user_id.toString() === user && data.rows[i].user_id.toString() !== ownId) {
                friends[data.rows[i].user_id] = true;
                friends[ownId] = false;
              } else if (data.rows[i].user_id.toString() == ownId) {
                friends[data.rows[i].user_id] = true;
              } else {
                friends[data.rows[i].user_id] = false;
              }
          }
        }
        chrome.storage.local.get(uri, function(obj) {
          if (obj[uri]) {
            self.setState({annotations: obj[uri], friends: friends});
          } else {
            self.setState({friends: friends});
          }
        })
      })


    chrome.storage.onChanged.addListener(function(changes) {
      debugger;
      console.log('chrome storage changed mothafucka', changes);
        self.setState({annotations: changes[uri].newValue});
    })
  }
});

module.exports = FriendsAnnotationsView;
