import React, { Component } from 'react';
import ButtonLine from '../stateless/ButtonLine/ButtonLine';
import EditLine from '../stateless/EditLine/EditLine';
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUp: true,
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  changeForm = () => this.setState({ signUp: !this.state.signUp, email: '', password: '', confirmPassword: '' });
  editEmail = event => this.setState({ email: event.target.value });
  editPassword = event => this.setState({ password: event.target.value});
  editConfirmPassword = event => this.setState({ confirmPassword: event.target.value });

  sendDataToBackend = () => {
    const { email, password, signUp } = this.state;
    const { getUser } = this.props;

    getUser({ email, password }, signUp)
  }

  render() {
    const { signUp } = this.state;
    const [formTitle, changeButtonTitle] = signUp ? ['Sign Up', 'I have account'] : ['Sign In', 'I need account'];

    return(
      <div className="sign-up-form">
        <div className="login-form--form-line"><h3>{formTitle}</h3></div>
        { EditLine("login-form--form-line", 'E-mail', 'email', this.editEmail, this.state.email, 'login-form--email-input') }
        { EditLine("login-form--form-line", 'Password', 'password', this.editPassword, this.state.password, 'login-form--password-input') }
        { signUp && EditLine("login-form--form-line", 'Password again', 'password', this.editConfirmPassword, this.state.confirmPassword, 'login-form--confirm-password-input') }
        { ButtonLine("login-form--form-line", formTitle, 'login-form--send-button', this.sendDataToBackend) }
        { ButtonLine("login-form--form-line", changeButtonTitle, 'login-form--change-button', this.changeForm) }
      </div>
    )
  }
};

export default SignUpForm;