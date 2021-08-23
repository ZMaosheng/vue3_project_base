/*
 * @Author: maosheng
 * @Date: 2021-06-09 14:11:30
 * @LastEditTime: 2021-06-21 13:47:16
 * @LastEditors: maosheng
 * @Description:
 */
import axios from 'axios';

console.log(import.meta.env);
class FetchData {
  constructor() {
    this.baseURL = import.meta.env.VITE_APP_BASE_URL;
    this.timeout = 3000; // 设置超时时间
  }
  setInterceptor(instance) {
    // 设置拦截器
    instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `${localStorage.getItem('token')}`;
        return config; // 增加token
      },
      (err) => {
        Promise.reject(err);
      }
    );

    instance.interceptors.response.use(
      (res) => {
        if (res.data && res.data.code === 200) {
          return res.data.data;
        } else {
          return;
        }
      },
      (err) => {
        Promise.reject(err);
      }
    );
  }

  request(request) {
    const instance = axios.create();
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...request,
    }; // 合并配置
    this.setInterceptor(instance);
    return instance(config);
  }
}

export default new FetchData();
