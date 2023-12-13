<template>
  <div class="outerContainer">
    <font-awesome-icon
      :icon="['fas', 'close']"
      class="icon"
      @click="$emit('close')"
    />

    <h2>
      Are you sure you want to {{ action }}
      <span class="catName">{{ cat.name }}</span
      >?
    </h2>
    <h3 v-if="action === 'adopt'">
      Once you click {{ actionUpperCase }} it is yours
    </h3>

    <h3 v-else>
      Once you click {{ actionUpperCase }} you won't be able to get it back
    </h3>

    <action-button
      :text="actionUpperCase"
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
import { type PropType } from "vue"
import type { Cat } from "@/api/types"
import { useUserStore } from "@/stores/user"
import { useCatsStore } from "@/stores/cats"

const userStore = useUserStore()
const catsStore = useCatsStore()

const props = defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true
  },
  action: {
    type: String,
    required: true
  }
})

const actionUpperCase =
  props.action.charAt(0).toUpperCase() + props.action.slice(1)

defineEmits(["close"])
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";
.outerContainer {
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

  .adoptButton {
    width: 80%;
  }
}
</style>
