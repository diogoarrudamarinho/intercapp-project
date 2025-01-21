import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Implement login logic here
    const { navigate } = this.props;
    navigate('/home');
  }

  render() {
    return (
      <Container>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Login</Button>{' '}
            <Button color="secondary" tag={Link} to="/register">Register</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default function LoginWithRouter(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}