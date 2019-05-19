/*
 * @Author: 宋乾
 * @Date: 2019-05-19 18:43:12
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 19:00:56
 */

import {
    I18nManager,
} from 'react-native';

import getSceneIndicesForInterpolationInputRange from 'react-navigation-stack/src/utils/getSceneIndicesForInterpolationInputRange';

function forInitial(props: any) {
    const {
        navigation,
        scene
    } = props;

    const focused = navigation.state.index === scene.index;
    const opacity = focused ? 1 : 0;
    // If not focused, move the scene far away.
    const translate = focused ? 0 : 1000000;
    return {
        opacity,
        transform: [{
            translateX: translate
        }, {
            translateY: translate
        }],
    };
}

/**
 * 重写安卓页面切换动画
 * 或者使用官方自带动画
 * import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
 * StackViewStyleInterpolator.forHorizontal
 */

function AndroidStack(props: any) {
    const {
        layout,
        position,
        scene
    } = props;

    if (!layout.isMeasured) {
        return forInitial(props);
    }
    const interpolate = getSceneIndicesForInterpolationInputRange(props);

    if (!interpolate) return {
        opacity: 0
    };

    const {
        first,
        last
    } = interpolate;
    const index = scene.index;

    const width = layout.initWidth;
    const translateX = position.interpolate({
        inputRange: [first, index, last],
        outputRange: I18nManager.isRTL ? [-width, 0, width * 0.3] : [width, 0, width * -0.3],
    });

    return {
        opacity: 1,
        transform: [{
            translateX
        }, {
            translateY: 0
        }],
    };
}

export default AndroidStack;