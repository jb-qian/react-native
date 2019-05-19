/*
 * @Author: 宋乾
 * @Date: 2019-04-22 10:11:41
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 18:54:26
 */

import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';

import Menu from './Menu';

type Callback = (index: number) => void;

interface Props{
    height?: number;
    switchArr?: [];
}
interface State{
    opacity: Animated.Value;
    zIndex: number;
    translateY: Animated.Value;
}

const HEIGHT = 50;

export default class AndroidPicker extends PureComponent<Props, State> {

    public height: number;
    public callback: Callback = () => {};

    constructor (props: Props){
        super (props)
        this.height = this.props.height ? this.props.height : (this.props.switchArr || Menu).length * HEIGHT;
        this.state = {
            zIndex: -99,
            opacity: new Animated.Value(0),
            translateY: new Animated.Value(this.height)
        }
    }
    select = (callback: Callback, type: boolean = true) => {
        this.callback = callback;
        type && this.setState({
            zIndex: 99
        })
        Animated.parallel([
            Animated.timing(this.state.translateY, {
                toValue: type ? 0 : this.height,
                duration: 200, //时间
                useNativeDriver: true, // 原生驱动
            }),
            Animated.timing(this.state.opacity, {
                toValue: type ? 1 : 0,
                duration: 200, //时间
                useNativeDriver: true, // 原生驱动
            }),
        ]).start(() => {
            !type && this.setState({
                zIndex: -99
            })
        });
    }
    _callback = (index: number) => {
        this.select(this.callback, false);
        this.callback && this.callback(index);
    }
    render () {
        let { switchArr } = this.props;
        return (
            <TouchableOpacity
                style={ [styles.androidMenuMask, { zIndex: this.state.zIndex }] }
                activeOpacity={ 1 }
                onPress={ () => this.select(this.callback, false) }>
                <Animated.View style={ [styles.mask, { opacity: this.state.opacity }] } />
                <Animated.View style={ [styles.androidMenu, { transform: [{ translateY: this.state.translateY }] }] }>
                    {
                        (switchArr || Menu).map((item, index) =>
                            <TouchableOpacity key={ `key-${index}` } style={ styles.androidMenuItem } activeOpacity={ .9 } onPress={ () => this._callback(index) }>
                                <Text style={ styles.androidMenuItemText }>{ item }</Text>
                            </TouchableOpacity>
                        )
                    }
                </Animated.View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    androidMenuMask: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: -99,
    },
    mask: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        opacity: 0,
        backgroundColor: 'rgba(0,0,0,.4)',
    },
    androidMenu: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 9
    },
    androidMenuItem: {
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e5e5',
        borderStyle: 'solid',
    },
    androidMenuItemText: {
        fontSize: 16,
    }
})