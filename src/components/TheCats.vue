<template>
  <section>
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
  </section>
</template>

<script lang="ts" setup>
import CatCard from "./CatCard.vue"
import ActionButton from "@/components/Shared/ActionButton.vue"

import { useCatsStore } from "@/stores/cats"
import { ref, computed, onMounted } from "vue"

//getting full array of cats from the store
const catsStore = useCatsStore()
onMounted(catsStore.FETCH_CATS)

//displaying first 20 cats in an array
const count = ref(0)
const displayedCats = computed(() => {
  const batchOfCats = 2
  const lastCatIndex = count.value * batchOfCats + batchOfCats

  const displayingCats = catsStore.cats.slice(0, lastCatIndex)

  return displayingCats
})

//show more button visible or not
const nextBatch = computed(() => {
  const currentLength = displayedCats.value.length
  const maxLength = catsStore.cats.length

  return currentLength < maxLength ? true : false
})
</script>

<style lang="scss" scoped>
.buttonContainer {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.catContainer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  row-gap: 30px;
}

@media only screen and (min-width: 2200px) {
  .catContainer {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media only screen and (max-width: 1800px) {
  .catContainer {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (max-width: 1400px) {
  .catContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 1000px) {
  .catContainer {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
