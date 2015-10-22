var React = require('react');
var MinimizeButton = require('./minimize-button');
var Header = require('../header/header');

var FeedView = React.createClass({
  render: function() {
    return (
      <div className='feed-view-container'>
        <div className='minimize-btn'>
          <MinimizeButton {...this.props} />
        </div>

        <div className='feed-container'>
          Feed DIVS go HERE!!!!
        </div>

      </div>
    );
  }
});

module.exports = FeedView;
