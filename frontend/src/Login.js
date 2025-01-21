import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

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
    const { login } = this.context;

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
          login('token-teste');
          const { navigate } = this.props;
          navigate('/home');
        } else {
          this.setState({ error: 'Email ou senha inválidos' });
        }
      } else {
        this.setState({ error: 'Email ou senha inválidos' });
      }
    } catch (error) {
      this.setState({ error: 'Ocorreu um erro. Tente novamente mais tarde.' });
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
            <Label for="password">Senha</Label>
            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Login</Button>{' '}
            <Button color="secondary" tag={Link} to="/register">Registrar</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

Login.contextType = AuthContext;

export default function LoginWithRouter(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}