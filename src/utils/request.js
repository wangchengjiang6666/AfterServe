import axios from 'axios';
import { message } from "antd";

const request = axios.create({
  baseURL: 'http://elm.cangdu.org/bos/',
  timeout: 2000,  //网络超时时间的设置
});

//请求拦截
 request.interceptors.request.use(
   config => {
     let jwtData = window.sessionStorage.getItem('jwt');
     if (jwtData) {
       jwtData = JSON.parse(jwtData);
       config.headers['Authorization'] = `Bearer ${jwtData.token}`;
     }
     return config;
   },
   error => {
     return Promise.reject(error);
   }
 )
 //响应拦截
 request.interceptors.response.use(
   response => {
    //  let result = response.data;
    //  if (result.code !==0) {
    //    message.error(result.msg);
    //    return Promise.reject(result.msg);
    //  }
     return response.data;
   },
   error => {
    //  根据 http 状态码，来报错
    //  获取状态码
     let status = error.response.status;
     if (status === 401) {
       message.error('token验证失败');
     }
     return Promise.reject(error);
   },
 );
 export default request;