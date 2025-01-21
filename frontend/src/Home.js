import React, { Component } from 'react';
import './styles.css'; // Import the new styles.css
import './App.css';
import AppNavbar from './AppNavbar';
import Hero from './Hero';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Hero />
        <Container fluid>
          <h3>Funcionalidades</h3>
          <p>Utilize o menu acima para navegar entre as funcionalidades da aplicação. Você pode consultar os horários dos ônibus, visualizar os ônibus disponíveis e fazer reservas de assentos.</p>
          <Button color="primary" tag={Link} to="/schedules/new">Adicionar Horário</Button>
        </Container>
      </div>
    );
  }
}

export default Home;