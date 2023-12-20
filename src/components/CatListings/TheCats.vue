<template>
  <section>
    <div>
      <cat-filters />
    </div>

    <div class="contentContainer">
      <div class="catContainer">
        <cat-card v-for="cat in displayedCats" :key="cat.id" :cat="cat" />
      </div>

      <div v-if="isErrorMessage" class="errorMessage">
        <h1>/ᐠ｡ꞈ｡ᐟ\</h1>
        <h1>Unfortunatelly we can't find your desired cat</h1>
        <h2>Maybe you could try changing some filters</h2>
      </div>

      <div class="buttonContainer">
        <action-button
          v-if="nextBatch"
          text="Show more"
          type="primary"
          @click="count++"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import CatFilters from "@/components/CatListings/CatFilters.vue"
import CatCard from "@/components/CatListings/CatCard.vue"
import ActionButton from "@/components/Shared/ActionButton.vue"

import { useCatsStore } from "@/stores/cats"
import { ref, computed, onMounted } from "vue"

//getting full array of cats from the store
const catsStore = useCatsStore()
onMounted(catsStore.FETCH_CATS)

const FILTERED_CATS = computed(() => catsStore.FILTERED_CATS)

const isErrorMessage = computed(() => {
  const lengthFilteredCats = ref(0)
  lengthFilteredCats.value = FILTERED_CATS.value.length
  if (lengthFilteredCats.value === 0) return true
  else return false
})

//displaying first 20 cats in an array
const count = ref(0)
const displayedCats = computed(() => {
  const batchOfCats = 20
  const lastCatIndex = count.value * batchOfCats + batchOfCats

  const displayingCats = FILTERED_CATS.value.slice(0, lastCatIndex)

  return displayingCats
})

//show more button visible or not
const nextBatch = computed(() => {
  const currentLength = displayedCats.value.length
  const maxLength = FILTERED_CATS.value.length

  return currentLength < maxLength ? true : false
})
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

section {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: nowrap;

  .contentContainer {
    flex: 1 1 auto;
  }
  .catContainer {
    margin: 20px;
    display: grid;
    place-items: center;
    row-gap: 30px;
  }
}
.errorMessage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: $primaryFontFamily;
  font-size: large;
}
.buttonContainer {
  height: 50px;
  margin: 50px 0px;
  display: flex;
  justify-content: center;
}

@media only screen and (min-width: 2500px) {
  .catContainer {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media only screen and (max-width: 2500px) {
  .catContainer {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media only screen and (max-width: 2050px) {
  .catContainer {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (max-width: 1600px) {
  .catContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 1150px) {
  .catContainer {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
