<template>
  <div class="outerContainer">
    <font-awesome-icon
      :icon="['fas', 'close']"
      class="icon"
      @click="$emit('close')"
    />

    <h2>
      Are you sure you want to adopt <span class="catName">{{ cat.name }}</span
      >?
    </h2>
    <h3>Once you click Adopt it is yours</h3>

    <action-button
      text="Adopt"
      type="primary"
      class="adoptButton"
      @click="
        $emit('close'),
          userStore.UPDATE_ADOPTED(cat),
          catsStore.DELETE_CAT(cat.id)
      "
    />
  </div>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import type { PropType } from "vue"
import type { Cat } from "@/api/types"
import { useUserStore } from "@/stores/user"
import { useCatsStore } from "@/stores/cats"

const userStore = useUserStore()
const catsStore = useCatsStore()

defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true
  }
})

defineEmits(["close"])
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";
.outerContainer {
  position: fixed;
  top: 20%;
  left: 40%;
  width: 700px;
  height: fit-content;
  padding: 20px;

  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: $buttonHoverBgColor;
  transition: opacity 0.3s ease;

  .icon {
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .catName {
    font-family: $secondaryFontFamily;
    font-size: 35px;

    margin: 0;
  }

  .adoptButton {
    width: 80%;
  }
}
</style>
