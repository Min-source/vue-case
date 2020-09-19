import axios from 'axios';

//全局配置
// axios.defaults.headers.common["token"] = ""
axios.defaults.headers.post["Content-type"] = "application/x-www-form-urlencoded"
//设置统一路径前缀
axios.defaults.baseURL = 'http://121.40.187.6:6677';

//配置请求拦截
axios.interceptors.response.use(config=>{
  //手动将参数转换为查询字符串，为呼应Content-type="application/x-www-form-urlencoded"
  console.log("config:",config);
  return config;
},error=>{
  return Promise.reject(error);
})
//配置响应response拦截器interceptor
axios.interceptors.response.use(
    res => {
      if (res) {
        //解构
        let {data}=res;
        //封装响应data
        res.data=data.data;
        res.status=data.status;
        res.statusText=data.message;
        return res;
      }
    },
    error => {
      return Promise.reject(error);
    }
  );
  
export default axios;