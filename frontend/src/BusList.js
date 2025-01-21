import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';

class BusList extends Component {
  constructor(props) {
    super(props);
    this.state = { buses: [], isLoading: true };
  }

  async componentDidMount() {
    const response = await fetch('/buses');
    if (response.ok) {
      const body = await response.json();
      this.setState({ buses: body, isLoading: false });
    } else {
      console.error('Failed to fetch buses:', response.statusText);
    }
  }

  render() {
    const { buses, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const busList = buses.map(bus => {
      return <tr key={bus.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{bus.model}</td>
        <td>{bus.plate}</td>
        <td>{bus.capacity}</td>
        <td>
          <Button size="sm" color="primary" tag={Link} to={"/reservations/" + bus.id}>Reserve</Button>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <h3>Buses</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Model</th>
                <th width="20%">Plate</th>
                <th width="20%">Capacity</th>
                <th width="30%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {busList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default BusList;