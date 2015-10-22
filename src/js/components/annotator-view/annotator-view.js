var React = require('react');
var AnnotatorBody = require('./annotator-body');
var AnnotatorHeader = require('../header/header');
var HomeButton = require('./home-button');
var AnnotatorMinimizeButton = require('./annotator-minimize-button');

var AnnotatorView = React.createClass({
  render: function() {
    return (
      <div className='annotator-view-container'>
        <HomeButton {...this.props} />
        <AnnotatorMinimizeButton {...this.props} />
        <AnnotatorHeader {...this.props} />
        <AnnotatorBody {...this.props} />
      </div>
    );
  }
});

module.exports = AnnotatorView;
