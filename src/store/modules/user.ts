import { defineStore } from "pinia";
import {reqCode,reqUserLogin} from '@/api/hospital/index'
import {LoginData} from '@/api/hospital/type'
import { SET_USERINFO,GET_USERINFO,REMOVE_USERINFO} from "@/utils/user";
const useUserStore=defineStore('User',{
    state:()=>{
        return {
            visiable:false as Boolean,
            code:'' as string,
            userInfo:JSON.parse(GET_USERINFO() as string) || {}
        }
    },
    actions:{
        showLoginDialog(){
            this.visiable=true
        },
        async getCode(phone:string){
            let result=await reqCode({phone})
            if(result.code==200){
                this.code=result.data
                return 'ok'
            }else {
                return Promise.reject(new Error(result.message))
            }
        },
        async login(params:LoginData){
            let result=await reqUserLogin(params)
            if(result.code==200){
                this.userInfo=result.data
                SET_USERINFO(JSON.stringify(result.data))
                return 'ok'
            }else {
                return Promise.reject(new Error(result.message))
            }
        },
        loginOut(){
            //清空仓库的数据
            this.userInfo = { name: '', token: '' };
            //清空本地存储的数据
            REMOVE_USERINFO();
        },
        //查询微信扫码的接口(看本地存储是否存储数据)
        queryState(){
            let timer=setInterval(()=>{
                let info=GET_USERINFO()
                if(info){
                    this.visiable=false
                    this.userInfo=JSON.parse(info)
                    clearInterval(timer)
                }
            },1000)
        }
    },
    getters:{

    }
})
export default useUserStore