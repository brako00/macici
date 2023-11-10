import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AnotherView from "@/views/AnotherView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    //new route
    path: "/another",
    name: "another",
    component: AnotherView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
