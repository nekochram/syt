<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { SET_USERINFO } from "@/utils/user";
let route = useRoute();
SET_USERINFO(JSON.stringify(route.query));
let htmlElement:any=document.querySelector('html')
htmlElement.style.display='none'
</script>

<style scoped></style>
