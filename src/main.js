import { createApp } from "vue";
import "@/style.css";
import App from "./App.vue";
import router from "@/plugins/router";
import axios from "axios";

createApp(App).use(router).mount("#app");
