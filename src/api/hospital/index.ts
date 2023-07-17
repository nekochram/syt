//引入二次封装axios
import request from "@/utils/request";
import type { DoctorInfoData,UserResponseData, DoctorResponseData, HospitalWordData, WXLoginResponseData, HospitalDetail, DeparmentResponseData, LoginData, UserLoginResponseData } from './type'
//获取医院详情的接口
export const reqHospitalDetail = (params:{hoscode: string}) => request.get<any, HospitalDetail>(`/hosp/hospital/${params.hoscode}`);
//获取医院科室的接口
export const reqHospitalDeparment = (params:{hoscode: string}) => request.get<any, DeparmentResponseData>(`/hosp/hospital/department/${params.hoscode}`);
//获取验证码接口
export const reqCode = (params:{phone: string}) => request.get<any, any>(`/sms/send/${params.phone}`);
//用户登录接口
export const reqUserLogin = (params: LoginData) => request.post<any, UserLoginResponseData>('/user/login', params);

//获取微信扫码登录生成二维码需要参数接口
export const reqWxLogin = (params:{wxRedirectUri: string}) => request.get<any, WXLoginResponseData>(`/user/weixin/getLoginParam/?wxRedirectUri=${params.wxRedirectUri}`);
//获取预约挂号的数据
export const reqHospitalWork = (params:{page: number, limit: number, hoscode: string, depcode: string}) => request.get<any, HospitalWordData>(`/hosp/hospital/auth/getBookingScheduleRule/${params.page}/${params.limit}/${params.hoscode}/${params.depcode}`);
//获取医生排班的数据
export const reqHospitalDoctor = (params:{hoscode: string, depcode: string, workDate: string}) => request.get<any, DoctorResponseData>(`/hosp/hospital/auth/findScheduleList/${params.hoscode}/${params.depcode}/${params.workDate}`);

//获取某一个账号下就诊人信息
export const reqGetUser = () => request.get<any, UserResponseData>('/user/patient/auth/findAll');

//获取挂号医生的信息
export const reqDoctorInfo = (params:{scheduleId:string})=>request.get<any,DoctorInfoData>(`/hosp/hospital/getSchedule/${params.scheduleId}`);