export class DeviceInformation {
  name: String;
  id: String;
  position: number;
  size: {
    width: number,
    height: number
  }
}

export class EffectConfig {
  message: string;
  speed: number;
  text_color: string;
  bg_color: string;
  font_style: string;
  font_size: number = 20;
  distance_text: number = 50;// khoang cach' chay. giua 2 thiet bi.
  distance_device: number = 5;// khoang cach' giua 2 chu~ lien tuc. trong text
  currentDevice: DeviceInformation;
  allDevices: Array<DeviceInformation>;
  totalDevice: number;
  public stringToColor(hex: string): number {
    return parseInt(hex.replace(/^#/, ''), 16);
  }
}

export interface IEffect {
  isPaused: boolean;
  isStarted: boolean;
  start(config?: any);
  stop();
  pause()
}