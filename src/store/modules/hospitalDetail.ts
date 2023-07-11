import { defineStore } from 'pinia'
import type {HospitalDetail,HosPitalDetail,DeparmentArr,DeparmentResponseData} from '@/api/hospital/type'
import {reqHospitalDetail,reqHospitalDeparment} from '@/api/hospital'
import {DetailState} from './interface'
const useDetailStore =defineStore('Detail', {
    state:():DetailState=>{
        return {
            hospitalInfo:{} as HosPitalDetail,
            deparmentArr:[] as DeparmentArr
        }
    },
    actions:{
        async getHospital(hoscode:string){
            let result:HospitalDetail=await reqHospitalDetail({hoscode})
            if(result.code==200){
                this.hospitalInfo=result.data
            }
        },
        async getDeparment(hoscode:string){
            let result:DeparmentResponseData=await reqHospitalDeparment({hoscode})
            if(result.code==200){
                this.deparmentArr=result.data
            }
        }
    },
    getters:{

    }
})
export default useDetailStore