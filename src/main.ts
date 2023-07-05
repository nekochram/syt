import { createApp } from 'vue'
import '@/style/reset.scss'
import App from './App.vue'
import HeaderNav from '@/components/HeaderNav/index.vue'
import FooterNav from '@/components/FooterNav/index.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app=createApp(App)
app.component('HeaderNav',HeaderNav)
app.component('FooterNav',FooterNav)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
