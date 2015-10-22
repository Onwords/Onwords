var React = require('react');

var MinimizeButton = React.createClass({
  handleClick: function() {
    this.props.updateView('showAnnotatorView');
  }, 
  render: function() {
    return (
      <div onClick={this.handleClick}>
        <img className='minimize-button' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Angle_right_font_awesome.svg/1000px-Angle_right_font_awesome.svg.png' />
      </div>
    );
  }
});

module.exports = MinimizeButton;