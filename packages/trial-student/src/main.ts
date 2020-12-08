import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components'

const app = createApp(App)

app.use(components)

app.use(store).use(router).mount('#app')
