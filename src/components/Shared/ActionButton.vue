<template>
  <button :class="buttonClass">{{ text }}</button>
</template>

<script lang="ts" setup>
import { toRefs, computed } from "vue"

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: "primary",
    validator(value: string) {
      return ["primary", "secondary"].includes(value)
    }
  }
})

//getting type from props
const { type } = toRefs(props)

//setting class of the button based on the type prop
const buttonClass = computed(() => {
  return {
    [type.value]: true
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

button {
  font-family: $primaryFontFamily;
  font-size: x-large;
  font-weight: 600;

  border-radius: 2%;
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.primary {
  background-color: $buttonBgColor;

  &:hover {
    background-color: $buttonHoverBgColor;
  }
}

.secondary {
  background-color: $bgColor;

  &:hover {
    background-color: $color3;
    color: aliceblue;
  }
}
</style>
