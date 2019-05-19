import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import ImagePicker from '../../components/ImagePicker';
import tools from '../../tools';

import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    navigation: any;
}

export default class Index extends Component<Props>{

    refImagePicker: any;

    images = (images: []) => {
        console.log(images);
    }
    select = () => {
        this.refImagePicker.select((res: []) => {
            console.log(res)
        });
    }
    componentDidMount (){

    }
    render (){
        return (
            <View style={ styles.flex }>
                <TouchableOpacity style={ styles.li } onPress={ () => this.props.navigation.navigate('List') }>
                    <Text style={ styles.text }>跳转</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.li } onPress={ this.select }>
                    <Text style={ styles.text }>选择</Text>
                </TouchableOpacity>
                <ImagePicker ref={ e => this.refImagePicker = e } />
                <LinearGradient style={{ height: 30 }} colors={ ['red', 'yellow'] }></LinearGradient>
                <WebView source={{ uri: 'https://www.baidu.com/' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        paddingTop: tools.header(),
        backgroundColor: '#f5f5f5',
    },
    li: {
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },
})