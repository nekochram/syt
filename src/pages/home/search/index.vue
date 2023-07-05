<template>
  <div class="search">
    <el-autocomplete
      @select="goDetail"
      :trigger-on-focus="false"
      clearable
      placeholder="请你输入医院名称"
      v-model="hosname"
      :fetch-suggestions="fetchData"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
//引入element-plus提供图标
import { Search } from "@element-plus/icons-vue";
import {reqHospitalInfo} from '@/api/home/index'
import type { HospitalInfo } from "@/api/home/type";
import { ref } from "vue";
let hosname=ref<string>('')
const fetchData=async (keyword:string,cb:any)=>{
    let result:HospitalInfo=await reqHospitalInfo({hosname:keyword})
    let showData=result?.data.map(item=>{
        return {
            value: item.hosname, //展示的医院的名字
            hoscode: item.hoscode, //存储医院的编码
        }
    })
    cb(showData)
}
const goDetail=()=>{

}
</script>
<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  ::v-deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>
