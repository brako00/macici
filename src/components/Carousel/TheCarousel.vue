<template>
  <section>
    <div class="allCats">
      <div v-for="(cat, index) in newCarouselCats" :key="cat.id">
        <div
          class="carouselCat"
          :class="{
            activeCat: isCatActive(cat),
            subActiveCat: isCatSubactive(cat)
          }"
          @mouseover="pauseActive(index)"
          @mouseleave="continueActive(index)"
          @click="openModal(index)"
        >
          <img :src="cat.image" />
          <div class="catName">
            {{ cat.name }}
          </div>
        </div>
      </div>

      <div class="arrowsContainer">
        <font-awesome-icon
          :icon="['fas', 'chevron-circle-left']"
          class="iconLeft"
          @click="(direction = false), goingLeft()"
          @mouseover="pauseInterval()"
          @mouseleave="continueInterval()"
        />

        <font-awesome-icon
          :icon="['fas', 'chevron-circle-right']"
          class="iconRight"
          @click="(direction = true), goingRight()"
          @mouseover="pauseInterval()"
          @mouseleave="continueInterval()"
        />
      </div>

      <modal-cat
        v-if="showModalCat"
        v-on-click-outside="closeModal"
        :cat-i-d="newCarouselCats[activeIndex].id"
        @close="closeModal"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import ModalCat from "@/components/Carousel/ModalCat.vue"

import { ref, onMounted, onBeforeUnmount, computed } from "vue"
import { vOnClickOutside } from "@vueuse/components"

import type { Cat } from "@/api/types"
import { useCatsStore } from "@/stores/cats"

const showModalCat = ref<boolean>(false)

const catsStore = useCatsStore()

const activeIndex = ref<number>(1)

const interval = ref<ReturnType<typeof setInterval>>()
const lengthOfInterval = 3000

const direction = ref<boolean>(true)

const newCarouselCats = computed(() => catsStore.YOUNGEST_CATS)

onMounted(async () => {
  await catsStore.FETCH_CATS()

  pauseInterval()
  continueInterval()
})

onBeforeUnmount(() => {
  pauseInterval()
})

const isCatActive = (cat: Cat) => {
  return newCarouselCats.value.indexOf(cat) === activeIndex.value
}

const isCatSubactive = (cat: Cat) => {
  return (
    newCarouselCats.value.indexOf(cat) === activeIndex.value - 1 ||
    newCarouselCats.value.indexOf(cat) === activeIndex.value + 1
  )
}

const pauseActive = (index: number) => {
  if (index === activeIndex.value) pauseInterval()
}

const continueActive = (index: number) => {
  pauseInterval()
  if (index === activeIndex.value) continueInterval()
}

const pauseInterval = () => {
  clearInterval(interval.value)
}

const continueInterval = () => {
  interval.value = setInterval(displayedCats, lengthOfInterval)
}

//changing image to the right one in array
const goingRight = () => {
  activeIndex.value++

  if (activeIndex.value === 3) {
    newCarouselCats.value.push(newCarouselCats.value[0])
    newCarouselCats.value.shift()
    activeIndex.value = 2
  }
}

//changing image to the left one in array
const goingLeft = () => {
  activeIndex.value--

  if (activeIndex.value === 0) {
    newCarouselCats.value.unshift(newCarouselCats.value[3])
    newCarouselCats.value.pop()
    activeIndex.value = 1
  }
}

const displayedCats = () => {
  if (direction.value === true) {
    goingRight()
  } else {
    goingLeft()
  }
}

const openModal = (index: number) => {
  if (index == activeIndex.value) showModalCat.value = true
}

const closeModal = () => {
  showModalCat.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

.carouselCat {
  display: none;
  padding: 15px;
}

.activeCat {
  display: block;

  &:hover {
    scale: 1.07;
  }
}

.subActiveCat {
  display: block;
  filter: blur(8px);
}

.allCats {
  padding-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  position: relative;

  img {
    width: 750px;
    height: 500px;
    object-fit: fill;
    border-radius: 2%;
  }

  .catName {
    color: #f2f2f2;
    font-family: $secondaryFontFamily;
    font-size: 50px;
    padding: 8px 12px;
    position: absolute;
    bottom: 8px;
    text-shadow: 2px 2px black;
  }
}

.iconRight,
.iconLeft {
  cursor: pointer;
  height: 50px;
  width: 50px;

  border-radius: 0 3px 3px 0;
  user-select: none;

  color: $primaryColor;
  position: absolute;
  bottom: 45%;
}

.iconLeft {
  left: calc(50% - 380px);
}

.iconRight {
  right: calc(50% - 380px);
}

@media only screen and (max-width: 800px) {
  .subActiveCat {
    display: none;
  }

  .carouselCat {
    width: 100%;
    box-sizing: border-box;

    img {
      width: 100%;
      max-height: 350px;
    }
  }

  .iconLeft {
    left: 0px;
  }

  .iconRight {
    right: 0px;
  }
}
</style>
