import React from 'react';
import { Container } from 'reactstrap';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <Container fluid>
        <h1 className="display-3">Bem-vindo ao IntercApp</h1>
        <p className="lead">O IntercApp é uma aplicação desenvolvida para facilitar a reserva de assentos nos ônibus intercampi da sua instituição. Aqui você pode consultar os horários dos ônibus, reservar assentos e acompanhar suas reservas.</p>
        <hr className="my-2" />
        <p>Utilize o menu acima para navegar entre as funcionalidades da aplicação. Você pode consultar os horários dos ônibus, visualizar os ônibus disponíveis e fazer reservas de assentos.</p>
      </Container>
    </div>
  );
}

export default Hero;