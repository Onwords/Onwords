var React = require('react');

var Login = React.createClass({
  submitHandler: function(e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    console.log(email, password);
  },

  render: function() {
    return (
      <div className='login-container'>
        <form onSubmit={this.submitHandler}>
          <input type='text' placeholder='Email' ref='email' />
          <input type='text' placeholder='Password' ref='password' />
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
});

module.exports = Login;
