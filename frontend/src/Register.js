import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
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
    // Implement registration logic here
    const { navigate } = this.props;
    navigate('/login');
  }

  render() {
    return (
      <Container>
        <h2>Register</h2>
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