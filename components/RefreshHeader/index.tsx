// import React, { Component } from 'react'
// import {
//     Text,
// } from 'react-native';

// import { RefreshHeaderPropType, RefreshHeaderStateType } from "react-native-spring-scrollview";

// class Header extends Component<RefreshHeaderPropType, RefreshHeaderStateType>{
// 	render() {
// 		// console.log(this.props)
// 		return <Text>1</Text>
// 	}
// }

// export default Header;

/**
 * Author: Shi(bolan0000@icloud.com)
 * Date: 2019/1/18
 * Copyright (c) 2018, AoTang, Inc.
 *
 * Description:
 */

import React from 'react';
import {
    Animated,
    Text,
    View
} from 'react-native';

export type HeaderStatus =
  | 'waiting'
  | 'pulling'
  | 'pullingEnough'
  | 'pullingCancel'
  | 'refreshing'
  | 'rebound';

interface HeaderPropType {
  offset: Animated.Value;
  maxHeight: number;
  bottomOffset?: number;
}

interface HeaderStateType {
  status: HeaderStatus;
}

export default class RefreshHeader extends React.Component<HeaderPropType, HeaderStateType> {

    static height = 50;

    static style = "stickyContent";

    constructor(props: HeaderPropType) {
        super(props);
        this.state = {
            status: 'waiting'
        }
    }

    changeToState(newStatus: HeaderStatus) {
            this.state.status !== newStatus &&
            this.onStateChange(this.state.status, newStatus);
    }

    onStateChange(oldStatus: HeaderStatus, newStatus: HeaderStatus) {
            this.setState({ status: newStatus });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 18 }}>{this.state.status}</Text>
            </View>
        );
    }
}