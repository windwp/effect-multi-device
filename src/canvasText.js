import React, { Component } from 'react';
import PixilRunning from './effect/pixilRunning';
import { EffectConfig } from './model/dataModel'
import 'latest-createjs';
export class CanvasText extends Component {
  image = null;
  canvas = null;
  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps);
    console.log('nextState', nextState);
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    this.resizeCanvas();
  }

  componentDidMount() {
    this.resizeCanvas();
  }
  resizeCanvas() {
    const oImage = {
      width: 2144,
      height: 1182
    };
    const oCanvas = {
      width: 1360,
      height: 760,
    };
    const positionTop = {
      left: 380,
      top: 220,
    }
    const cImage = {
      width: this.image.width,
      height: this.image.width * oImage.height / oImage.width
    };
    const cCanvas = {
      width: Math.round(cImage.width * oCanvas.width / oImage.width) + 1,
      height: Math.round(cImage.height * oCanvas.height / oImage.height) + 1
    };
    this.canvas.width = cCanvas.width;
    this.canvas.height = cCanvas.height;
    let top = Math.floor(positionTop.top * cImage.height / oImage.height);
    let left = Math.floor(positionTop.left * cImage.width / oImage.width);
    this.canvas.style.top = top + 'px';
    this.canvas.style.left = left + 'px';
    this.canvasSize = cCanvas;
  }


  startAnimation(animationData) {
    this.stopAnimation();
    let config = new EffectConfig();
    config.text_color = 'white';
    config.bg_color = '#0000ff';
    config.font_size = 20;
    config.font_style = '20px Arial';
    config.speed = 2;
    config.distance_device = 5;
    config.distance_text = 50;
    config.currentDevice = this.getDeviceInformation();
    config.message = animationData.message;
    config.allDevices = animationData.listDevice;
    config.totalDevice = animationData.totalDevice;
    // this._stage = new RunningText(this.canvas, config);
    this._stage = new PixilRunning(this.canvas, config);
    this._stage.start();
  }

  pauseAnimaion() {
    if (this._stage) {
      this._stage.pause();
    }
  }
  stopAnimation() {
    if (this._stage) {
      this._stage.stop();;
      this._stage = null;
    }
  }

  getDeviceInformation() {
    return {
      name: this.props.name,
      id: this.props.id,
      position: this.props.cIndex,
      size: {
        width: this.canvasSize.width,
        height: this.canvasSize.height,
      }
    }
  }

  render() {
    let canvasStyle = {
      backgroundColor: 'blue',
      position: 'absolute',
      top: '0px',
      left: '0px',
    }
    return (
      <div>
        <label>{this.props.name}</label>
        <div>
          <canvas style={canvasStyle} ref={(canvas) => { this.canvas = canvas }}></canvas>
          <img src='./images/phone.png' className='phone-image' width='100%' style={{ position: 'absolute' }}
            ref={(image) => { this.image = image }} alt={'Phone ' + this.props.cIndex}
          />
        </div>
      </div>
    );
  }
}