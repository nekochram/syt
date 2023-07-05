<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <ul>
        <li :class="{active:regionFlag==''}" @click="changeRegion('')">全部</li>
        <li v-for="item in regionArr" :key="item.value" :class="{active:regionFlag==item.value}" @click="changeRegion(item.value)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import {reqHospitalLevelAndRegion} from '@/api/home/index'
import {HospitalLevelAndRegionArr,HospitalLevelAndRegionResponseData} from '@/api/home/type'
let regionFlag=ref<string>('')
let regionArr=ref<HospitalLevelAndRegionArr>([])
const getRegion=async ()=>{
    let result:HospitalLevelAndRegionResponseData=await reqHospitalLevelAndRegion({dictCode:"Beijin"})
    if(result.code==200){
        regionArr.value=result.data
    }
}
const changeRegion=(value:string)=>{
    regionFlag.value=value
    emit('getRegion',value)
}
onMounted(()=>{
    getRegion()
})
let emit=defineEmits(['getRegion'])
</script>

<script lang="ts">
export default {
  name: "Region",
};
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 20px;
  .content {
    display: flex;
    .left {
      margin-right: 10px;
      width: 50px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
      }
    }
  }
}
</style>
