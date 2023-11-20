<template>
  <section>
    <div>
      <cat-filters class="catFilters" />
    </div>

    <div class="contentContainer">
      <div class="catContainer">
        <cat-card
          v-for="cat in displayedCats"
          :key="cat.id"
          :cat="cat"
          role="catCard"
        />
      </div>
      <div class="buttonContainer">
        <action-button
          v-if="nextBatch"
          text="Show more"
          type="secondary"
          @click="count++"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import CatFilters from "./CatFilters.vue"
import CatCard from "./CatCard.vue"
import ActionButton from "@/components/Shared/ActionButton.vue"

import { useCatsStore } from "@/stores/cats"
import { ref, computed, onMounted } from "vue"

//getting full array of cats from the store
const catsStore = useCatsStore()
onMounted(catsStore.FETCH_CATS)

const FILTERED_CATS = computed(() => catsStore.FILTERED_CATS)

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
section {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: nowrap;
  .catFilters {
    width: 250px;
    position: sticky;
    top: 60px;
  }
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
.buttonContainer {
  margin-top: 50px;
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
