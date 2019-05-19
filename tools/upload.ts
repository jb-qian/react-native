/*
 * @Author: 宋乾
 * @Date: 2019-05-19 19:08:48
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-19 19:15:30
 */

const upload = async (config: any) => {
    return new Promise((resolve, reject) => {
        let timeout = 10000;
        // 10秒物理超时
        let timer = setTimeout(() => {
            reject({
                status: 504,
                data: '网络连接超时，请稍后重试'
            })
        }, timeout);
        fetch(config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: config.data,
        })
        .then((response) => response.text())
        .then(async (data) => {
            clearTimeout(timer);
            resolve(JSON.parse(data));
        })
        .catch((error) => {
            clearTimeout(timer);
            reject({
                status: 1,
                data: '网络请求出错'
            })
        });
    });
}

export default upload;