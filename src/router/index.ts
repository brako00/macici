import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import AdminView from "@/views/AdminView.vue"
import CreateEdit from "@/components/AdminPages/CreateEdit.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: CreateEdit
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
