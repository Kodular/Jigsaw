import { createApp } from "vue";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Editor from "./Editor.vue";
import App from "./App.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/project', component: Editor },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

let app = createApp(App)
app.use(router);
app.use(PrimeVue);
app.mount("#app");
