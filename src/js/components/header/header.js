var React = require('react');

var AnnotatorHead = React.createClass({
  render: function() {
    return (
      <div className='annotator-head-container'>
        <div className='user-image'>
        </div>
        
        <div className='user-info'>
        Jihoon Kim
        <br />
        Hoonthegoon9000
        </div>
        
      </div>
    );
  }
});

module.exports = AnnotatorHead;
