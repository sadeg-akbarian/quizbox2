import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  },
  {
    path: "/data",
    name: "theData",
    component: () => import("@/views/DataView.vue"),
  },
  {
    path: "/admincontrol",
    name: "adminControlPanel",
    component: () => import("@/views/AdminControlPanel.vue"),
  },
  {
    path: "/createnewquestion",
    name: "createnewquestion",
    component: () => import("@/views/CreateNewQuestion.vue"),
  },
  {
    path: "/editquestion",
    name: "editquestion",
    component: () => import("@/views/EditAQuestion.vue"),
  },
  {
    path: "/resultpage",
    name: "resultpage",
    component: () => import("@/views/ResultPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
