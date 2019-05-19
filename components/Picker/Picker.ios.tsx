/*
 * @Author: 宋乾
 * @Date: 2019-04-22 10:11:41
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 18:54:51
 */

import React, { PureComponent } from 'react'
import {
    View,
    ActionSheetIOS,
} from 'react-native';

import Menu from './Menu';

type Callback = (index: number) => void;

interface Props{
    switchArr?: [];
}

export default class Index extends PureComponent<Props>{
    select = (callback: Callback) => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: this.props.switchArr || Menu,
            cancelButtonIndex: 2,
        }, (index: number) => {
            callback && callback(index);
        });
    }
    render (){
        return <View />
    }
}