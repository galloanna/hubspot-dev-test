import { createApp } from 'vue';
import App from './App.vue';
import vClickOutside from "click-outside-vue3"
import '../styles/index.scss';

const app = createApp(App);
app.mount('#app');
app.use(vClickOutside)

console.log('App Ready');
