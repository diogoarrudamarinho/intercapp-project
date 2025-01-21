import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      register: '',
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
    const { email, password, name } = this.state;

    // Generate a random register number
    const register = Math.random().toString(36).substring(2, 15);

    try {
      // Check if the email already exists
      const checkResponse = await fetch(`/students/${email}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (checkResponse.ok) {
        this.setState({ error: 'Email already exists' });
        return;
      }

      // Create a new student
      const response = await fetch('/students', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail: email, password, name, register })
      });

      if (response.ok) {
        const { navigate } = this.props;
        navigate('/login');
      } else {
        this.setState({ error: 'Failed to register. Please try again.' });
      }
    } catch (error) {
      this.setState({ error: 'An error occurred. Please try again later.' });
    }
  }

  render() {
    return (
      <Container>
        <h2>Register</h2>
        {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Register</Button>{' '}
            <Button color="secondary" tag={Link} to="/login">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default function RegisterWithRouter(props) {
  const navigate = useNavigate();
  return <Register {...props} navigate={navigate} />;
}