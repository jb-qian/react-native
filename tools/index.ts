/*
 * @Author: 宋乾
 * @Date: 2019-01-18 14:59:31
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 22:25:16
 */

import {
    Platform,
    Dimensions,
    Linking,
    Alert,
    findNodeHandle,
    UIManager,
} from 'react-native';

import { readonly, Mounted } from './descriptor';
import { padding, margin, border, distance } from './css';

import upload from './upload';

// 存储
import AsyncStorage from './asyncstorage';
export { AsyncStorage };

import NetInfo from './netinfo';
export { NetInfo };

const { width, height } = Dimensions.get('window');

// 单位适配
const BASE_WIN_WIDTH = 375;
const rem = (n: number) => n / 2 * (width / BASE_WIN_WIDTH);

// 爱疯x
const X_WIDTH = 375;
const X_HEIGHT = 812;
const isIphoneX = Platform.OS === 'ios' && ((height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT));

// 判断Android or IOS
const os = <T>(android?: T, ios?: T, x?: T) => Platform.OS === 'android' ? android : isIphoneX && x ? x : ios;

// alert
const alert = (config: any) => {
    let { title, info, yes, no, cancel, yesText, noText, cancelText } = config;
    let arr = [];
    no && arr.push({ text: noText || '取消', onPress: () => no() });
    yes && arr.push({ text: yesText || '确定', onPress: () => yes() });
    cancel && arr.push({ text: cancelText || '我再看看', onPress: () => cancel() });
    Alert.alert(title, info, arr, { cancelable: false });
}

// 打开链接，可以拨打电话
const linking = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            let text = url.indexOf('tel:') !== -1 ? '拨打电话出错' : `打开${url}失败`;
            alert({
                title: `错误提示`,
                info: text,
                yes: () => { }
            })
        } else {
            return Linking.openURL(url);
        }
    }).catch(err =>
        console.error('An error occurred', err)
    );
}

// 爱疯头部间距
const iphoneHead: number = 20;
const iphoneXHead: number = 44;
// 爱疯x底部间距
const iphoneXFoot: number = 34;
// 用来判断不同终端头部
const header = (number: number = 0) => os(number, iphoneHead + number, iphoneXHead + number);
// 用来判断不同终端头部
const footer = (number: number = 0) => os(number, number, iphoneXFoot + number);

// 获取元素宽高尺寸
const layout = (ref: React.Component<any, any, any>) => {
    const handle = findNodeHandle(ref);
    if (handle) {
        return new Promise((resolve) => {
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                resolve({
                    x,
                    y,
                    width,
                    height,
                    pageX,
                    pageY
                });
            });
        });
    }
    console.error('An error in layout');
}

// 格式化时间
const iniDate = (time: number) => {
    let date = new Date(time * 1000);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    }
}

export default {
    rem,
    isIphoneX,
    os,
    readonly,
    Mounted,
    upload,
    linking,
    iphoneHead,
    iphoneXHead,
    iphoneXFoot,
    header,
    footer,
    layout,
    iniDate,
    padding,
    margin,
    border,
    distance,
};