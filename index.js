/*
 * @Author: 宋乾
 * @Date: 2019-05-19 11:18:35
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 21:38:04
 */

import { AppRegistry } from 'react-native';

import App from './router/index';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// 发布模式取消控制台打印
if (!__DEV__) {
	global.console = {
		info: () => { },
		log: () => { },
		warn: () => { },
		debug: () => { },
		error: () => { },
	};
}
// 删除恶心的黄屏幕警告 改在控制台打印
console.disableYellowBox = true;