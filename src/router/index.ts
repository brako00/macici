import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import AdminView from "@/views/AdminView.vue"
import EditPage from "@/components/AdminPages/EditPage.vue"

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
    component: EditPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
