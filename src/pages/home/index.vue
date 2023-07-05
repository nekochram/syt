<template>
  <div>
    <!-- 首页轮播图的结构 -->
    <Carousel />
    <!-- 首页搜索医院的表单区域 -->
    <Search />
    <!-- 底部展示医院的结构 -->
    <el-row gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel" />
        <!--地区 -->
        <Region @getRegion="getRegion" />
        <!-- 展示医院的结构 -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospitalInfo="item"
          />
        </div>
        <el-empty v-else description="暂无数据" />
        <!-- 分页器 -->

        <el-pagination
          v-model:current-page="pageNumber"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getHospitalList"
          @size-change="getHospitalList"
        />
      </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
//引入组合式API函数
import { onMounted, ref } from "vue";
//引入首页轮播图组件
import Carousel from "./carousel/index.vue";
//引入首页搜索的组件
import Search from "./search/index.vue";
// 引入首页等级的组件
import Level from "./level/index.vue";
// 引入首页地区选择的组件
import Region from "./region/index.vue";
//展示医院新的的卡片组件
import Card from "./card/index.vue";
import { reqHospital } from "@/api/home/index";
import {Content,HospitalResponseData} from '@/api/home/type'
let hasHospitalArr = ref<Content>([]);
let pageNumber = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
//存储医院的等级相应数据
let hostype = ref<string>("");
//存储医院的地区
let districtCode = ref<string>("");
const getHospitalList = async () => {
  let result:HospitalResponseData = await reqHospital({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value,
    hostype: hostype.value,
    districtCode: districtCode.value,
  });
  if (result.code == 200) {
    //存储已有的医院的数据
    hasHospitalArr.value = result.data.content;
    //存储医院的总个数
    total.value = result.data.totalElements;
  }
};
const getLevel=(value:string)=>{
    hostype.value=value
    getHospitalList()
}
const getRegion=(value:string)=>{
    districtCode.value=value
    getHospitalList()
}
onMounted(() => {
  getHospitalList();
});
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0px;
  }
}
</style>
