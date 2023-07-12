//存储用户信息
export const SET_USERINFO=(userInfo:string)=>{
    localStorage.setItem('USERINFO',userInfo)
}
//读取用户信息
export const GET_USERINFO=()=>{
    return localStorage.getItem('USERINFO')
}
//清除用户信息
export const REMOVE_USERINFO=()=>{
    return localStorage.removeItem('USERINFO')
}