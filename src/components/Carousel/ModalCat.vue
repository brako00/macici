<template>
  <div class="modalContainer">
    <img :src="cat.image" alt="Image of the cat" class="modalImage" />

    <font-awesome-icon
      :icon="['fas', 'close']"
      class="icon"
      @click="$emit('close')"
    />

    <div class="catInfo">
      <h2 class="catName">{{ cat.name }}</h2>
      <div class="extraCatInfo">
        <span>
          <h4>Fur color:</h4>
          <h3>{{ cat.color }}</h3>
        </span>
        <span>
          <h4>Months old:</h4>
          <h3>{{ cat.age }}</h3>
        </span>
      </div>

      <action-button
        text="Adopt"
        type="primary"
        class="adoptButton"
        @click="openAdoptModal"
      />

      <adopt-modal
        v-if="showAdoptModal"
        v-on-click-outside="closeAdoptModal"
        :cat="cat"
        @close="$emit('close'), closeAdoptModal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AdoptModal from "@/components/Shared/AdoptModal.vue"
import ActionButton from "@/components/Shared/ActionButton.vue"
import type { PropType } from "vue"
import type { Cat } from "@/api/types"
import { ref } from "vue"

const showAdoptModal = ref<boolean>(false)

const openAdoptModal = () => {
  showAdoptModal.value = true
}

const closeAdoptModal = () => {
  showAdoptModal.value = false
}

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
.modalContainer {
  position: fixed;
  top: 20%;
  left: auto;
  width: 1400px;
  height: fit-content;

  z-index: 999;
  display: flex;
  flex-direction: row;

  background-color: $bgColor;
  transition: opacity 0.3s ease;

  .icon {
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .catInfo {
    padding-left: 10px;
    width: 25%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    padding: 20px;

    .catName {
      font-family: $secondaryFontFamily;
      font-size: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }

    .extraCatInfo {
      display: flex;
      flex-direction: column;

      font-family: $primaryFontFamily;
      font-size: 26px;

      span {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-right: 15px;
      }
    }
    .adoptButton {
      width: 100%;
    }
  }

  .modalImage {
    width: 75%;
    height: fit-content;
  }
}
</style>
