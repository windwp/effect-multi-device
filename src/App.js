import React, { Component } from 'react';
import { Button, Container, Header, Input, Grid } from 'semantic-ui-react';
import { CanvasText } from './canvasText';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {

  data = {
    numberDevice: 3,
    message: '(づ｡◕‿‿◕｡)づ Hello World ✌.ʕʘ‿ʘʔ.✌         '
  }

  listDevice = [];
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.data)
    this.createCanvasDevice();
  }

  renderDevice() {
    return (
      <Grid columns={this.data.numberDevice}>
        {this.reactObj}
        }
      </Grid>)
  }

  deviceChange(e) {
    this.setState({ numberDevice: parseInt(e.target.value, 10) || 0 });
  }

  textChange(e) {
    this.setState({ message: e.target.value })
  }

  createDevice_click() {
    if (this.state.numberDevice < 16) {
      this.data.numberDevice = parseInt(this.state.numberDevice, 10);
    } else {
      this.data.numberDevice = 10
    }
    this.setState({ numberDevice: this.data.numberDevice })
    this.createCanvasDevice();
  }

  createCanvasDevice() {
    console.log("recreate device")
    let numberDevice = this.data.numberDevice;
    this.listDevice = Array(numberDevice).fill(null);
    this.reactObj = [...Array(this.data.numberDevice).keys()].map((item, index) => {
      return (
        <Grid.Column key={index}>
          <CanvasText ref={c => this.listDevice[index] = c} name={'Phone ' + (index + 1)} cIndex={index} ></CanvasText>
        </Grid.Column>
      )
    });
  }
  startAnimation() {
    var listInformation = [];
    this.listDevice.forEach(item => {
      if (item) {
        listInformation.push(item.getDeviceInformation())
      }
    })
    this.listDevice.forEach(item => {
      if (item) {
        item.startAnimation({
          message: this.state.message,
          totalDevice: this.data.numberDevice,
          listDevice: listInformation
        });
      }
    })
  }
  pauseAnimaion() {
    this.listDevice.forEach(item => {
      if (item) {
        item.pauseAnimaion();
      }
    })
  }
  render() {
    return (
      <div>
        <Container textAlign='center'>
          <Header>Multi view</Header>
          <div>
            <Input placeholder='Device Number' value={this.state.numberDevice} label='Number :' size='big' fluid={true} onChange={(e) => this.deviceChange(e)}>
            </Input>
          </div>
          <Button color='red' onClick={(e) => this.createDevice_click()}>
            Create Device
          </Button>
          <div>
            <Input value={this.state.message} label='Text :' size='big' fluid={true} onChange={(e) => this.textChange(e)}>
            </Input>
          </div>
          <Button color='red' onClick={(e) => this.startAnimation(e)}>
            Start
          </Button>
          <Button color='red' onClick={(e) => this.pauseAnimaion(e)}>
            Pause
          </Button>
        </Container>
        <Container style={{ marginTop: '40px', textAlign: 'center' }}>
          {this.renderDevice()}
        </Container>
      </div>
    );
  }
}

export default App;