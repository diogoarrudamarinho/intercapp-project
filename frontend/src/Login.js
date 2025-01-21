import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
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

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch(`/students/${email}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.password === password) {
          const { navigate } = this.props;
          navigate('/home');
        } else {
          this.setState({ error: 'Invalid email or password' });
        }
      } else {
        this.setState({ error: 'Invalid email or password' });
      }
    } catch (error) {
      this.setState({ error: 'An error occurred. Please try again later.' });
    }
  }

  render() {
    return (
      <Container>
        <h2>Login</h2>
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
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