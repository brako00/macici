<template>
  <sign-in v-if="!userStore.adminLoggedIn" />
  <div v-else>
    <create-page />
    <edit-page />
  </div>
</template>

<script lang="ts" setup>
import SignIn from "@/components/SignIn.vue"

import EditPage from "@/components/EditPage.vue"

import CreatePage from "@/components/CreatePage.vue"
import { useUserStore } from "@/stores/user"
// import type { PropType } from "vue"
// import type { Cat } from "@/api/types"

const userStore = useUserStore()

// const props = defineProps({
//   cat: {
//     type: Object as PropType<Cat>,
//     required: true
//   },
//   action: {
//     type: String,
//     required: true
//   }
// })
</script>
