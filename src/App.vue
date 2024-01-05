<template>
  <the-header />
  <RouterView />
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue"

import { RouterView } from "vue-router"
</script>
