<template>
  <input ref="mojInput" type="radio" checked />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const mojInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (mojInput.value) {
    console.log(mojInput.value.checked)
  }
})
</script>
