<template>
  <div class="catOutline">
    <div class="catCard">
      <img :src="cat.image" alt="Image of the cat" />

      <div class="catInfo">
        <h2 class="catName">{{ cat.name }}</h2>
        <div class="textContainer">
          <span>
            <h4>Fur color:</h4>
            <h3>{{ cat.color }}</h3>
          </span>
          <span>
            <h4>Months old:</h4>
            <h3>{{ cat.age }}</h3>
          </span>
        </div>
      </div>

      <action-button
        v-if="!userStore.adminLoggedIn"
        text="Adopt"
        type="primary"
        class="adoptButton"
        @click="openModal"
      />

      <router-link :to="{ name: 'admin' }">
        <action-button
          v-if="userStore.adminLoggedIn"
          text="Edit"
          type="primary"
        />
      </router-link>

      <action-button
        v-if="userStore.adminLoggedIn"
        text="Delete"
        type="primary"
        @click="catsStore.DELETE_CAT(cat.id)"
      />

      <!-- <h2 v-else class="adoptedLine">Adopted</h2> -->

      <adopt-modal
        v-if="showAdoptModal"
        v-on-click-outside="closeModal"
        :cat="cat"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import type { PropType } from "vue"
import type { Cat } from "@/api/types"
import { ref } from "vue"
import AdoptModal from "@/components/Shared/AdoptModal.vue"

import { useUserStore } from "@/stores/user"
import { useCatsStore } from "@/stores/cats"

import { vOnClickOutside } from "@vueuse/components"

const userStore = useUserStore()
const catsStore = useCatsStore()

const showAdoptModal = ref<boolean>(false)

defineProps({
  cat: {
    type: Object as PropType<Cat>,
    required: true
  }
})

const openModal = () => {
  showAdoptModal.value = true
}

const closeModal = () => {
  showAdoptModal.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";
.catOutline {
  font-family: $primaryFontFamily;
  display: flex;
  height: 550px;
  width: 400px;
}
.catCard {
  background-color: $bgColor;
  border: 2px;
  border: solid;
  border-radius: 2%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .adoptButton {
    margin-bottom: 15px;
  }
  .adoptedLine {
    background-color: $buttonBgColor;
    font-size: 200%;
    margin: 0;
    font-family: $secondaryFontFamily;
    text-align: center;
    width: 100%;
    position: relative;
    bottom: 0;
  }

  img {
    height: 300px;
    width: 100%;
    object-fit: fill;
    border-radius: 2% 2% 0 0;
  }

  .catInfo {
    margin: 5px;
    padding: 5px;
    font-weight: 600;
    width: 100%;
  }

  .catName {
    font-size: 200%;
    margin: 5px 0;
    font-family: $secondaryFontFamily;
    text-align: center;
  }
  .textContainer {
    display: flex;
    justify-content: space-between;
    margin: 0 10px 10px 10px;
  }

  h3 {
    font-size: 150%;
    margin: 0;
    padding: 2.5px 0;
  }
}
</style>
