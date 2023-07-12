//引入二次封装axios
import request from "@/utils/request";
import type { DoctorInfoData,UserResponseData, DoctorResponseData, HospitalWordData, WXLoginResponseData, HospitalDetail, DeparmentResponseData, LoginData, UserLoginResponseData } from './type'
//枚举请求地址
enum API {
    //获取微信扫码登录需要参数
    WXLOGIN_URL = '/user/weixin/getLoginParam/',
    //获取某一个医院的某一个科室预约挂号数据
    HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    //获取医院某一个科室某一天相应医生排班的数据
    HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    //获取某一个账号下就诊人的信息
    GETUSER_URL = '/user/patient/auth/findAll',
    //获取挂号医生的信息
    GETDOCTOR_URL='/hosp/hospital/getSchedule/'
}
//获取医院详情的接口
export const reqHospitalDetail = (params:{hoscode: string}) => request.get<any, HospitalDetail>(`/hosp/hospital/${params.hoscode}`);
//获取医院科室的接口
export const reqHospitalDeparment = (params:{hoscode: string}) => request.get<any, DeparmentResponseData>(`/hosp/hospital/department/${params.hoscode}`);
//获取验证码接口
export const reqCode = (params:{phone: string}) => request.get<any, any>(`/sms/send/${params.phone}`);
//用户登录接口
export const reqUserLogin = (params: LoginData) => request.post<any, UserLoginResponseData>('/user/login', params);

//获取微信扫码登录生成二维码需要参数接口
export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);
//获取预约挂号的数据
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, HospitalWordData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`);
//获取医生排班的数据
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`);

//获取某一个账号下就诊人信息
export const reqGetUser = () => request.get<any, UserResponseData>(API.GETUSER_URL);

//获取挂号医生的信息
export const reqDoctorInfo = (scheduleId:string)=>request.get<any,DoctorInfoData>(API.GETDOCTOR_URL+scheduleId);