import axios from 'axios';


const BASE_URL = ''; // 开发环境运行
/**
 * 发送ajax请求的函数
 * @param url 地址
 * @param data 请求参数
 * @param type 请求方式
 * @returns promise对象
 */
export default function ajax(url = '', data = {}, type = 'GET') {
    url = BASE_URL + url;
    if (type === 'GET') {
        // 准备url query参数数据
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        });
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr
        };
        // 发送get请求
        return axios.get(url);
    } else {
        // 发送post请求
        return axios.post(url, data);  // data: 包含请求体数据的对象
    }
}