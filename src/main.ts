import { createApp } from "vue"
import { createPinia } from "pinia"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faSearch,
  faChevronCircleLeft,
  faChevronCircleRight,
  faClose,
  faTrash,
  faEdit,
  faFilter,
  faPaw
} from "@fortawesome/free-solid-svg-icons"

import App from "./App.vue"
import router from "@/router"

//adding icons that I need
library.add(faSearch)
library.add(faChevronCircleLeft)
library.add(faChevronCircleRight)
library.add(faClose)
library.add(faTrash)
library.add(faEdit)
library.add(faFilter)
library.add(faPaw)

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app")
