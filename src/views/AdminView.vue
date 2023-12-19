<template>
  <sign-in v-if="!userStore.adminLoggedIn" />
  <create-page v-else />
</template>

<script lang="ts" setup>
import SignIn from "@/components/AdminPages/SignIn.vue"

import CreatePage from "@/components/AdminPages/CreatePage.vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
</script>
