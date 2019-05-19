/*
 * @Author: 宋乾
 * @Date: 2019-05-19 15:39:58
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 18:53:27
 */

import React, { Component } from 'react'
import {
    Dimensions,
    PermissionsAndroid,
    Platform,
} from 'react-native';

import SyanImagePicker from 'react-native-syan-image-picker';

import Picker from '../Picker';

/**
 * @param imageCount 最大选择图片数目
 * @param isRecordSelected 记录当前已选中的图片
 * @param isCamera 是否允许用户在内部拍照
 * @param isCrop 是否允许裁剪，imageCount 为1才生效
 * @param CropW 裁剪宽度，默认屏幕宽度60%
 * @param CropH 裁剪高度，默认屏幕宽度60%
 * @param showCropCircle 是否显示圆形裁剪区域%
 * @param circleCropRadius 圆形裁剪半径，默认屏幕宽度一半
 * @param showCropFrame 是否显示裁剪区域
 * @param showCropGrid 是否隐藏裁剪区域网格
 * @param quality 压缩质量(安卓无效，固定鲁班压缩)
 * @param minimumCompressSize 小于100kb的图片不压缩（Android）
 * @param enableBase64 是否返回base64编码，默认不返回，返回太多会造成卡顿
 */

interface Props {
    imageCount?: number;
    isRecordSelected?: boolean;
    isCamera?: boolean;
    isCrop?: boolean;
    CropW?: number;
    CropH?: number;
    showCropCircle?: boolean;
    circleCropRadius?: number;
    showCropFrame?: boolean;
    showCropGrid?: boolean;
    quality?: number;
    minimumCompressSize?: number;
    enableBase64?: boolean;
}

const { width } = Dimensions.get('window');

export default class Index extends Component<Props>{

    private refPicker: any = null;

    static defaultProps = {
        imageCount: 9,
        isRecordSelected: false,
        isCamera: false,
        isCrop: false,
        CropW: width * .6,
        CropH: width * .6,
        showCropCircle: false,
        circleCropRadius: width * .5,
        showCropFrame: true,
        showCropGrid: false,
        quality: 90,
        minimumCompressSize: 100,
        enableBase64: false,
    }

    private options = {
        imageCount: this.props.imageCount,
        isRecordSelected: this.props.isRecordSelected,
        isCamera: this.props.isCamera,
        isCrop: this.props.isCrop && this.props.imageCount === 1,
        CropW: this.props.CropW,
        CropH: this.props.CropH,
        showCropCircle: this.props.showCropCircle,
        circleCropRadius: this.props.circleCropRadius,
        showCropFrame: this.props.showCropFrame,
        showCropGrid: this.props.showCropGrid,
        quality: this.props.quality,
        minimumCompressSize: this.props.minimumCompressSize,
        enableBase64: this.props.enableBase64,
    }

    removePhotoAtIndex = (index: number) => {
        // 更新原生图片数组
        SyanImagePicker.removePhotoAtIndex(index);
        // 移除全部选中图片
        // SyanImagePicker.removeAllPhoto()
        // 删除缓存
        // SyanImagePicker.deleteCache();
    }

    // 拍照前动态获取权限
    requestPermission = async () => {
        if (Platform.OS === 'ios') {
            return true;
        }
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: '申请读写手机存储权限',
                    message: '是否允许此App读写手机存储？',
                    buttonNeutral: '我再想想',
                    buttonNegative: '拒绝',
                    buttonPositive: '同意',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    // 调用相册
    ImagePicker = (callback: Function) => {
        SyanImagePicker.showImagePicker(this.options, (error: string, selectedPhotos: []) => {
            // error = 取消
            if (error) { selectedPhotos = []; }
            // 选择成功，渲染图片
            callback(selectedPhotos);
        })
    }

    // 调用相机
    openCamera = (callback: Function) => {
        SyanImagePicker.openCamera(this.options, (error: string, selectedPhotos: []) => {
            // error = 取消
            if (error) { selectedPhotos = []; }
            // 选择成功，渲染图片
            callback(selectedPhotos);
        })
    }

    select = (callback: Function) => {
        this.refPicker && this.refPicker.select((index: number) => {
            if (this.requestPermission()) {
                switch (index) {
                    case 0:
                        this.ImagePicker(callback);
                        break;
                    case 1:
                        this.openCamera(callback);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    render (){
        return (
            <Picker ref={ (e: any) => this.refPicker = e } />
        )
    }
}