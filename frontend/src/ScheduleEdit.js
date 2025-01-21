import React, { Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ScheduleEdit extends Component {
  emptyItem = {
    route: '',
    departureTime: '',
    arrivalTime: '',
    busId: '',
    estimatedTimes: [{ point: '', time: '' }]
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      buses: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEstimatedTimesChange = this.handleEstimatedTimesChange.bind(this);
    this.addEstimatedTime = this.addEstimatedTime.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.params;
    const busResponse = await fetch('/buses');
    if (busResponse.ok) {
      const buses = await busResponse.json();
      this.setState({ buses });
    } else {
      console.error('Failed to fetch buses:', busResponse.statusText);
    }

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

  handleEstimatedTimesChange(event, index, field) {
    const value = event.target.value;
    let item = { ...this.state.item };
    item.estimatedTimes[index][field] = value;
    this.setState({ item });
  }

  addEstimatedTime() {
    let item = { ...this.state.item };
    item.estimatedTimes.push({ point: '', time: '' });
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    const { navigate } = this.props;

    // Convert estimatedTimes array to a hashmap
    const estimatedTimes = {};
    item.estimatedTimes.forEach(et => {
      if (et.point && et.time) {
        estimatedTimes[et.point] = et.time;
      }
    });
    item.estimatedTimes = estimatedTimes;

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
    const { item, buses } = this.state;
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
              <Label for="busId">Bus</Label>
              <Input type="select" name="busId" id="busId" value={item.busId || ''}
                onChange={this.handleChange} autoComplete="busId">
                <option value="">Select a bus</option>
                {buses.map(bus => (
                  <option key={bus.id} value={bus.id}>{bus.model} ({bus.plate})</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="estimatedTimes">Estimated Times</Label>
              {item.estimatedTimes.map((et, index) => (
                <div key={index}>
                  <Label for={`point-${index}`}>Point</Label>
                  <Input type="text" name={`point-${index}`} id={`point-${index}`} value={et.point || ''}
                    onChange={(e) => this.handleEstimatedTimesChange(e, index, 'point')} autoComplete={`point-${index}`} />
                  <Label for={`time-${index}`}>Time</Label>
                  <Input type="text" name={`time-${index}`} id={`time-${index}`} value={et.time || ''}
                    onChange={(e) => this.handleEstimatedTimesChange(e, index, 'time')} autoComplete={`time-${index}`} />
                </div>
              ))}
              <Button color="primary" onClick={this.addEstimatedTime}>+</Button>
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