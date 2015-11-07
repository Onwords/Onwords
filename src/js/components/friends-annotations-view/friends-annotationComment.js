var React = require('react');

var friendAnnotationComment = React.createClass({


  render: function() {
    var userpic = this.props.userpic;
    console.log(userpic);
    var annotation = this.props.annotation;
    var self = this;
    var clickHandler = function() {
      self.props.clickHandler(annotation);
    };
  
    var userColor = $('span[data-annotation-id="' + annotation.id + '"]').css('background-color'); 

    // var marginRight = this.props.spotlight === annotation.id ? '20px' : '0px';

    var divStyle = {
      borderLeft: '4px solid ' + userColor,
      // marginRight: marginRight
    }

    return (
      <div onClick={clickHandler} className="annotation" style={divStyle}>
        <img className='friends-pic' src={userpic} />
        <p>{annotation.text}</p>
      </div>
    )
  }
})

module.exports = friendAnnotationComment;