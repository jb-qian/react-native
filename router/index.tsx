import React, { PureComponent } from 'react'
import {
    View,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import AndroidStack from './AndroidStack';

// 路由组件
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

// 页面组件
import List from '../App';
import Home from '../pages/home/Index';

// 选项卡
const Tabs = createBottomTabNavigator({
    Home: {
        screen: Home,
        defaultNavigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
}, {
    // 默认覆盖标签栏
    // tabBarComponent: TabNavigator,
    // 标签设置
    tabBarOptions: {
        // 是否显示标签
        showLabel: false,
        style: {
            height: 0,
            padding: 0,
        },
    },
});

const config = {
    defaultNavigationOptions: {
        header: null,
        gesturesEnabled: true,
        gestureResponseDistance: {
            horizontal: 200
        },
    },
    transitionConfig:()=>({
        // 改写了动画
        screenInterpolator: AndroidStack,
    })
}

// 页面
const MainNavigator = createStackNavigator({
    // 主页面
	App: {
        screen: Tabs,
    },
    List: {
        screen: List,
    }
}, { ...config });

import NavigationService from './NavigationService';

const App = createAppContainer(MainNavigator);

export default class Route extends PureComponent {
    // toast = (text) => {
    //     this.refToast.toast(text);
    // }
    public componentDidMount() {
        SplashScreen.hide();
    }
    render (){
        return (
            <View style={ {flex: 1} }>
                {/* <Toast ref={ child => this.refToast = child } /> */}
                <App screenProps={ {
                    // toast: this.toast,
                } } ref={ navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }} />
            </View>
        )
    }
}