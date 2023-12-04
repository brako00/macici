<template>
  <sign-in v-if="!userStore.adminLoggedIn" />
  <admin-form v-else />

  <router-link :to="{ name: 'home' }"> <div>go back</div></router-link>
</template>

<script lang="ts" setup>
import SignIn from "./SignIn.vue"
import AdminForm from "@/components/AdminForm.vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
</script>
