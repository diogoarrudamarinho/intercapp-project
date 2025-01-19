import React, { Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ScheduleEdit extends Component {
  emptyItem = {
    route: '',
    departureTime: '',
    arrivalTime: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.params;
    if (id !== 'new') {
      const response = await fetch(`/schedules/${id}`);
      if (response.ok) {
        const schedule = await response.json();
        this.setState({ item: schedule });
      } else {
        console.error('Failed to fetch schedule:', response.statusText);
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    const { navigate } = this.props;

    await fetch('/schedules' + (item.id ? '/' + item.id : ''), {
      method: item.id ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    navigate('/schedules');
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? 'Edit Schedule' : 'Add Schedule'}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="route">Route</Label>
              <Input type="text" name="route" id="route" value={item.route || ''}
                onChange={this.handleChange} autoComplete="route" />
            </FormGroup>
            <FormGroup>
              <Label for="departureTime">Departure Time</Label>
              <Input type="text" name="departureTime" id="departureTime" value={item.departureTime || ''}
                onChange={this.handleChange} autoComplete="departureTime" />
            </FormGroup>
            <FormGroup>
              <Label for="arrivalTime">Arrival Time</Label>
              <Input type="text" name="arrivalTime" id="arrivalTime" value={item.arrivalTime || ''}
                onChange={this.handleChange} autoComplete="arrivalTime" />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/schedules">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default function ScheduleEditWithRouter(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <ScheduleEdit {...props} params={params} navigate={navigate} />;
}