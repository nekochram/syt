import { defineStore } from 'pinia'
import type {HospitalDetail,HosPitalDetail} from '@/api/hospital/type'
import {reqHospitalDetail} from '@/api/hospital'
import {DetailState} from './interface'
const useDetailStore =defineStore('Detail', {
    state:():DetailState=>{
        return {
            hospitalInfo:{} as HosPitalDetail
        }
    },
    actions:{
        async getHospital(hoscode:string){
            let result:HospitalDetail=await reqHospitalDetail({hoscode})
            if(result.code==200){
                this.hospitalInfo=result.data
                console.log(this.hospitalInfo)
            }
        }
    },
    getters:{

    }
})
export default useDetailStore