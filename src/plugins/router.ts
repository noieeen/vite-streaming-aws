import { createRouter, createWebHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/playground",
    name: "playground",
    component: () => import("@/views/Playground.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
