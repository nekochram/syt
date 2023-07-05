import request from "@/utils/request";
import {HospitalResponseData,HospitalLevelAndRegionResponseData,HospitalInfo} from './type'
//获取医院的数据
export const reqHospital = (params:{pageNumber:number,pageSize:number,hostype:string,districtCode:string}) => request.get<any,HospitalResponseData>(`/hosp/hospital/${params.pageNumber}/${params.pageSize}?hostype=${params.hostype}&districtCode=${params.districtCode}`)
//获取医院的等级或者获取医院地区的数据
export const reqHospitalLevelAndRegion = (params:{dictCode: string}) => request.get<any, HospitalLevelAndRegionResponseData>(`/cmn/dict/findByDictCode/${params.dictCode}`);
//根据关键字获取医院的数据进行展示
export const reqHospitalInfo = (params:{hosname: string}) => request.get<any, HospitalInfo>(`/hosp/hospital/findByHosname/${params.hosname}`);