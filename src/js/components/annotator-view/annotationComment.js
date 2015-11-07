var React = require('react');

var annotationComment = React.createClass({
  getInitialState: function() {
    return {
      shouldEditComment: false
    }
  },

  editComment: function() {
    this.setState({shouldEditComment: true});
  },

  submitChange: function(e) {
    e.preventDefault();
    var newText = $('textArea#annotationEdit').val();
    console.log('new text:', newText)
    var annotation = this.props.annotation;
    annotation.text = newText;
    var ev = new CustomEvent('updateAnnotation', {detail: {targetAnnotation: annotation}})
    document.dispatchEvent(ev);
    this.setState({shouldEditComment: false});
  },

  componentDidMount: function() {
    var self = this;
    // $('.comment-delete-button').unbind('click').bind('click', (function(e) {
    //   debugger;
    //   e.stopPropagation();
    //   self.props.deleteAnn(self.props.annotation);
    // }));
    // var THIS = this;
    // // esc and enter functionality
    // $(document).keypress(function(e) {
    //   var key = e.which;
    //   console.log('inside!!!!!!');
    //   if (key == 13) {
    //     console.log('Enter was pushed!', this);
    //     THIS.submitChange(e);
    //     return false;
    //   }
    // });

    // $(document).on('keyup', function(e){
    //   if (e.which == 27) { 
    //     console.log('ESCAPE KEY PRESSED!');
    //     // rerender the annotator view?
    //     $('.annotator-cancel').trigger('click.annotator-editor');
    //   }    
    // }); 
  },


  render: function() {
    var userColor = $('span[data-annotation-id="' + this.props.annotation.id + '"]').css('background-color'); 
    var divStyle = {
      borderLeft: '4px solid ' + userColor
    }

    console.log('inside annotationcomment:', this.props.annotation);
    var annotation = this.props.annotation;
    var self = this;

    var clickHandler = function(e) {
      if (e.target.className !== 'comment-delete-button') {
        self.props.clickHandler(annotation);
      }
    };

    var deleteAnn = function(e) {
      debugger;
      console.log(e.target);
      e.stopPropagation();
      self.props.deleteAnn(annotation);
    }

    return (
      <div onClick={clickHandler} className="annotation" style={divStyle}>
        {!this.state.shouldEditComment ? <p>{annotation.text}</p> : 
          <form>
            <textArea id="annotationEdit" style={{height: 100+"px", width: 300+"px"}}>
              {annotation.text}
            </textArea>
            <button className='comment-submit-button' onClick={this.submitChange}>Submit</button>
          </form>
          }
        <button className='comment-delete-button' onClick={deleteAnn}>Remove</button>
        <button className='comment-edit-button' onClick={this.editComment}>Edit</button>
      </div>
    )
  }
});


module.exports = annotationComment;