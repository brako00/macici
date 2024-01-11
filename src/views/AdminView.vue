<template>
  <sign-in v-if="!userStore.adminLoggedIn" />
  <create-edit v-else />
</template>

<script lang="ts" setup>
import SignIn from "@/components/AdminPages/SignIn.vue"
import CreateEdit from "@/components/AdminPages/CreateEdit.vue"

import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
</script>
