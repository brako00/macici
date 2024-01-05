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
    </div>
  </div>

  <adopt-modal
    v-if="showAdoptModal"
    v-on-click-outside="closeAdoptModal"
    :cat="cat"
    action="adopt"
    @close="$emit('close'), closeAdoptModal"
  />
</template>

<script lang="ts" setup>
import AdoptModal from "@/components/Shared/AdoptModal.vue"
import ActionButton from "@/components/Shared/ActionButton.vue"

import { vOnClickOutside } from "@vueuse/components"
import { ref } from "vue"

import { useCatsStore } from "@/stores/cats"

const props = defineProps({
  catID: {
    type: Number,
    required: true
  }
})

defineEmits(["close"])

const showAdoptModal = ref<boolean>(false)

const catsStore = useCatsStore()
catsStore.GET_UNIQUE_CAT(props.catID)

const cat = catsStore.uniqueCat

const openAdoptModal = () => {
  showAdoptModal.value = true
}

const closeAdoptModal = () => {
  showAdoptModal.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";
.modalContainer {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  max-width: fit-content;
  height: fit-content;

  z-index: 999;
  display: flex;
  flex-direction: row;

  background-color: $bgColor;

  .modalImage {
    max-width: 100%;
    min-width: 75%;
    height: fit-content;
  }

  .icon {
    height: 40px;
    width: 40px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    background-color: $bgColor;
  }

  .catInfo {
    padding-left: 10px;
    min-width: 25%;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-sizing: border-box;

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
}

@media only screen and (max-width: 1200px) {
  .modalContainer {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 75%;

    .catInfo {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 600px) {
  .modalContainer {
    height: max-content;
    width: 100%;
  }
}
</style>
