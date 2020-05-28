import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from './SignUpForm';

describe('<SignUpForm />', () => {
  const container = shallow(<SignUpForm  />);

  it('should have email input', () => {
    const wrapper = container.find('.login-form--email-input')
    expect(wrapper.prop('value')).toEqual('');
    expect(wrapper.prop('type')).toEqual('email');
    expect(wrapper.prop('placeholder')).toEqual('E-mail');
  });

  it('should have password input', () => {
    const wrapper = container.find('.login-form--password-input')
    expect(wrapper.prop('value')).toEqual('');
    expect(wrapper.prop('type')).toEqual('password');
    expect(wrapper.prop('placeholder')).toEqual('Password');
  });

  it('should have confirm password input', () => {
    const wrapper = container.find('.login-form--confirm-password-input')
    expect(wrapper.prop('value')).toEqual('');
    expect(wrapper.prop('type')).toEqual('password');
    expect(wrapper.prop('placeholder')).toEqual('Password again');
  });

  it('should have sign up button', () => {
    const wrapper = container.find('.login-form--send-button');
    expect(wrapper.prop('onClick')).toEqual(expect.any(Function));
    expect(wrapper.prop('children')).toEqual('Sign Up');
    expect(wrapper.prop('className')).toEqual('login-form--send-button');
  });

  it('should have change button', () => {
    const wrapper = container.find('.login-form--change-button');
    expect(wrapper.prop('onClick')).toEqual(expect.any(Function));
    expect(wrapper.prop('children')).toEqual('I have account');
    expect(wrapper.prop('className')).toEqual('login-form--change-button');
  });
});

describe('<SignInForm />', () => {
  const container = shallow(<SignUpForm  />);
  const button = container.find('.login-form--change-button');
  button.find('button').simulate('click');

  it('should have email input', () => {
    const wrapper = container.find('.login-form--email-input')
    expect(wrapper.prop('value')).toEqual('');
    expect(wrapper.prop('type')).toEqual('email');
    expect(wrapper.prop('placeholder')).toEqual('E-mail');
  });

  it('should have password input', () => {
    const wrapper = container.find('.login-form--password-input')
    expect(wrapper.prop('value')).toEqual('');
    expect(wrapper.prop('type')).toEqual('password');
    expect(wrapper.prop('placeholder')).toEqual('Password');
  });

  it('should have sign up button', () => {
    const wrapper = container.find('.login-form--send-button');
    expect(wrapper.prop('onClick')).toEqual(expect.any(Function));
    expect(wrapper.prop('children')).toEqual('Sign In');
    expect(wrapper.prop('className')).toEqual('login-form--send-button');
  });

  it('should have change button', () => {
    const wrapper = container.find('.login-form--change-button');
    expect(wrapper.prop('onClick')).toEqual(expect.any(Function));
    expect(wrapper.prop('children')).toEqual('I need account');
    expect(wrapper.prop('className')).toEqual('login-form--change-button');
  });
});