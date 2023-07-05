<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul class="hospital">
        <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
        <li v-for="level in levelArr" :class="{active:activeFlag==level.value}" :key="level.value" @click="changeLevel(level.value)">{{level.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import {reqHospitalLevelAndRegion} from '@/api/home/index'
import {HospitalLevelAndRegionArr,HospitalLevelAndRegionResponseData} from '@/api/home/type'
let levelArr=ref<HospitalLevelAndRegionArr>([])
let activeFlag=ref<string>('')
const getLevels=async ()=>{
    let result:HospitalLevelAndRegionResponseData=await reqHospitalLevelAndRegion({dictCode:"HosType"})
    if(result.code==200){
        levelArr.value=result.data
    }
}
const changeLevel=(value:string)=>{
    activeFlag.value=value
    emit('getLevel',value)
}
onMounted(()=>{
    getLevels()
})
let emit=defineEmits(['getLevel'])
</script>

<script lang="ts">
export default {
  name: "Level",
};
</script>

<style scoped lang="scss">
.level {
  color: #7f7f7f;
  margin-top: 20px;
  h1 {
    font-weight: 900;
    margin: 10px 0px;
  }
  .content {
    display: flex;
    .left {
      margin-right: 10px;
    }
    .hospital {
      display: flex;
      li {
        margin-right: 10px;
        &.active {
          color: #55a6fe;
        }
      }
      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>
