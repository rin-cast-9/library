import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Маршрутизация
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App); // Создание экземпляра приложения
app.use(router); // Подключение маршрутизации
app.mount('#app'); // Привязка экземпляра приложения к странице HTML (находится в public)
