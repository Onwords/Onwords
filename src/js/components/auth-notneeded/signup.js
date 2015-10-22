var React = require('react');

var Signup = React.createClass({
  submitHandler: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    console.log(email, username);
  },

  render: function() {
    return (
      <div className='signup-container'>
        <span>Sign Up</span>
        <span>Have the OAUTH here</span>
        <form onSubmit={this.submitHandler}>
          <input type='text' placeholder='UserName' ref='username' />
          <input type='text' placeholder='Email' ref='email' />
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
});

module.exports = Signup;
