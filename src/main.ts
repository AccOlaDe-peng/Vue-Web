import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "./assets/css/tailwind.css";
import "./assets/css/main.css";

// 引入Element Plus
import ElementPlus from "element-plus";
// 引入Element Plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

// 引入字体图标库
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

// 注册Element Plus
app.use(ElementPlus);
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(pinia);
app.mount("#app");
