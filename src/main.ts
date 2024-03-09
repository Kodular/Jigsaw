import {createApp} from "vue";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import {createRouter, createWebHistory} from "vue-router";
import Home from "./Home.vue";
import App from "./App.vue";
import Project from "./Project.vue";
import ToastService from 'primevue/toastservice';

const routes = [
  {path: '/', component: Home},
  {path: '/project/:id', component: Project},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let app = createApp(App)
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.mount("#app");
