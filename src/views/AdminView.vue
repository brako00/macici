<template>
  <sign-in v-if="!userStore.adminLoggedIn" />
  <create-page v-else />
</template>

<script lang="ts" setup>
import SignIn from "@/components/SignIn.vue"

import CreatePage from "@/components/CreatePage.vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
</script>
