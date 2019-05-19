import { Platform } from 'react-native';

const Component = Platform.select({
    ios: () => require('./Picker.ios'),
    android: () => require("./Picker.android")
})().default;

export default Component;