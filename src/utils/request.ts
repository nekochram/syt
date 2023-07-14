import axios from 'axios'
//@ts-ignore
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
const request=axios.create({
    baseURL:'/api',
    timeout:5000
})

request.interceptors.request.use(config=>{
    config.headers.token=useUserStore().userInfo.token||''
    return config
})

request.interceptors.response.use(response=>{
    if(response.data.code!=200){
        ElMessage({
            type: 'error',
            message:response.data.message,
          })
        return Promise.reject(new Error(response.data.message))
    }
    return response.data
},error=>{
    let {status}=error.response
    let message=''
    switch (status) {
        case 401:
            message='登陆过期请重新登录'
            break;
        case 404:
            message='请求路径错误'
            break;
        case 500 || 501 || 502 || 503 || 505:
            message='服务器出差了'
            break;
        default:
            message='服务器出差了'
            break;
    }
    ElMessage({
        type: 'error',
        message,
      })
    return Promise.reject(new Error(error.message))
})

export default request