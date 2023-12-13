<template>
  <div class="outerContainerModal">
    <font-awesome-icon
      :icon="['fas', 'close']"
      class="icon"
      @click="$emit('close')"
    />

    <h2>
      You have successfully {{ action }}
      <span class="catName">{{ cat.name }}</span>
    </h2>

    <action-button
      text="OK"
      type="primary"
      class="confirmationButton"
      @click="$emit('close')"
    />
  </div>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import type { PropType } from "vue"
import type { Cat } from "@/api/types"

defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true
  },
  action: {
    type: String,
    required: true
  }
})

defineEmits(["close"])
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";
.outerContainerModal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 700px;
  height: fit-content;
  padding: 20px;
  box-sizing: border-box;

  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: $buttonHoverBgColor;
  transition: opacity 0.3s ease;
  transform: translate(-50%, -50%);

  font-size: large;
  font-family: $primaryFontFamily;

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

  .confirmationButton {
    width: 80%;
  }
}

@media only screen and (max-width: 700px) {
  .outerContainerModal {
    width: 100%;
  }
}
</style>
