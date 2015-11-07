var React = require('react');

var AnnotatorButton = React.createClass({
  handleClick: function() {
    debugger;
    this.props.updateView('showAnnotatorView');
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className='annotator-button-container'>
        <img className='annotator-button' src='https://cdn1.iconfinder.com/data/icons/education-set-5/512/dialogue-512.png' />
      </div>
    );
  }
});

module.exports = AnnotatorButton;
