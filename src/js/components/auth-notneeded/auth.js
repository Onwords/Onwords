var React = require('react');
var Login = require('./login');
var Signup = require('./signup');

var Auth = React.createClass({
  getInitialState: function() {
    return {
      showLogin: true,
      showSignup: false 
    };
  },

  toggle: function() {
    if(this.state.showSignup === true){
      this.setState({showSignup: false});
      this.setState({showLogin: true});
    } else {
      this.setState({showSignup: true});
      this.setState({showLogin: false});
    }
  },

  render: function() {
    return (
      <div className='auth-container'>
        {this.state.showLogin ? <Login /> : null}
        {this.state.showLogin ? <span onClick={this.toggle}>Sign up for onWords</span> : null}

        {this.state.showSignup ? <Signup /> : null}
        {this.state.showSignup ? <span onClick={this.toggle}>Log In</span> : null}
      </div>
    );
  }
});

module.exports = Auth;
