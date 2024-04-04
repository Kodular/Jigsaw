import {createApp} from "vue";
import PrimeVueStyled from 'primevue/styled';
import {createRouter, createWebHistory} from "vue-router";
import Home from "./Home.vue";
import App from "./App.vue";
import Project from "./Project.vue";
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';
import '@fontsource-variable/inter';

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
app.use(PrimeVueStyled as any);
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.mount("#app");
