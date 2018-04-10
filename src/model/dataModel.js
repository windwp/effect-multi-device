export class DeviceInformation {
}
export class EffectConfig {
    constructor() {
        this.font_size = 20;
        this.distance_text = 50; // khoang cach' chay. giua 2 thiet bi.
        this.distance_device = 5; // khoang cach' giua 2 chu~ lien tuc. trong text
    }
    stringToColor(hex) {
        return parseInt(hex.replace(/^#/, ''), 16);
    }
}
