import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";

// 引入字体图标库
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

app.use(router);
app.mount("#app");
