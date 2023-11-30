<template>
  <section>
    <div class="allCats">
      <div v-for="cat in carouselCats" :key="cat.id">
        <div
          class="carouselCat"
          :class="{
            activeCat: carouselCats.indexOf(cat) === activeIndex,
            subActiveCat: carouselCats.indexOf(cat) !== activeIndex
          }"
          @click="openModal"
        >
          <font-awesome-icon
            v-if="carouselCats.indexOf(cat) === activeIndex"
            :icon="['fas', 'chevron-circle-left']"
            class="iconLeft"
            @click="(direction = false), goingLeft()"
          />

          <font-awesome-icon
            v-if="carouselCats.indexOf(cat) === activeIndex"
            :icon="['fas', 'chevron-circle-right']"
            class="iconRight"
            @click="(direction = true), goingRight()"
          />

          <img :src="cat.image" />
          <div class="catName">
            {{ cat.name }}
          </div>
        </div>
      </div>

      <modal-cat
        v-if="showModalCat"
        v-on-click-outside="closeModal"
        :cat="carouselCats[1]"
        @close="closeModal"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import ModalCat from "@/components/ModalCat.vue"
import { useCatsStore } from "@/stores/cats"
import { ref, onMounted, onBeforeUnmount } from "vue"
import type { Cat } from "@/api/types"

import { vOnClickOutside } from "@vueuse/components"

const showModalCat = ref<boolean>(false)

const catsStore = useCatsStore()

const activeIndex = ref<number>(1)
const activeIndexYoungestCats = ref<number>(0)
const carouselCats = ref<Cat[]>([])

const interval = ref<ReturnType<typeof setInterval>>()
const lengthOfInterval = 3000
const direction = ref<boolean>(true)

onMounted(async () => {
  await catsStore.FETCH_CATS()

  //creates array of 3 elements with active cat in the middle
  carouselCats.value.push(
    catsStore.YOUNGEST_CATS[0],
    catsStore.YOUNGEST_CATS[1]
  )
  carouselCats.value.unshift(catsStore.YOUNGEST_CATS[3])

  pauseInterval()
  continueInterval()
})

onBeforeUnmount(() => {
  pauseInterval()
})

const pauseInterval = () => {
  clearInterval(interval.value)
}

const continueInterval = () => {
  interval.value = setInterval(displayedCats, lengthOfInterval)
}

//stopping auto changing images in carousel on hover
const stoppingOnHover = (active: Element) => {
  // console.log("active", active)
  active.addEventListener("mouseover", () => {
    pauseInterval()
  })
  active.addEventListener("mouseout", () => {
    continueInterval()
  })
}

//changing image to the right one in array
const goingRight = () => {
  activeIndexYoungestCats.value++
  carouselCats.value.shift()

  if (activeIndexYoungestCats.value === catsStore.YOUNGEST_CATS.length - 1)
    carouselCats.value.push(catsStore.YOUNGEST_CATS[0])
  else if (activeIndexYoungestCats.value > catsStore.YOUNGEST_CATS.length - 1) {
    activeIndexYoungestCats.value = 0
    carouselCats.value.push(
      catsStore.YOUNGEST_CATS[activeIndexYoungestCats.value + 1]
    )
  } else
    carouselCats.value.push(
      catsStore.YOUNGEST_CATS[activeIndexYoungestCats.value + 1]
    )

  if (activeIndexYoungestCats.value < 0) {
    activeIndexYoungestCats.value = catsStore.YOUNGEST_CATS.length - 1
  }
}

//changing image to the left one in array
const goingLeft = () => {
  activeIndexYoungestCats.value--
  carouselCats.value.pop()

  if (activeIndexYoungestCats.value === 0)
    carouselCats.value.unshift(
      catsStore.YOUNGEST_CATS[catsStore.YOUNGEST_CATS.length - 1]
    )
  else if (activeIndexYoungestCats.value < 0) {
    activeIndexYoungestCats.value = catsStore.YOUNGEST_CATS.length - 1
    carouselCats.value.unshift(
      catsStore.YOUNGEST_CATS[activeIndexYoungestCats.value - 1]
    )
  } else
    carouselCats.value.unshift(
      catsStore.YOUNGEST_CATS[activeIndexYoungestCats.value - 1]
    )

  if (activeIndexYoungestCats.value > catsStore.YOUNGEST_CATS.length - 1) {
    activeIndexYoungestCats.value = 0
  }
}

const displayedCats = () => {
  if (direction.value === true) {
    goingRight()
    const active = document.querySelectorAll(".subActiveCat")[1]
    stoppingOnHover(active)
  } else {
    goingLeft()
    const active = document.querySelectorAll(".subActiveCat")[0]
    stoppingOnHover(active)
  }
}

const openModal = () => {
  showModalCat.value = true
  pauseInterval()
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
// .activeCat {
//   animation-name: move;
//   animation-duration: 1.5s;
//   animation-timing-function: ease-in-out;
// }

// @keyframes move {
//   from {
//     left: 0px;
//   }
//   to {
//     left: 50px;
//   }
// }

.activeCat {
  display: block;
  position: relative;
}

.activeCat:hover {
  scale: 1.07;
}

.subActiveCat {
  display: block;
  filter: blur(8px);
}

.allCats {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    height: 500px;
    width: 700px;
    object-fit: fill;
    border-radius: 2%;
  }
}

.iconRight,
.iconLeft {
  cursor: pointer;
  height: 50px;
  width: 50px;

  border-radius: 0 3px 3px 0;
  user-select: none;
  position: absolute;
  bottom: 45%;
  color: $bgColor;
}

.iconLeft {
  left: 0px;
}

.iconRight {
  right: 0px;
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
</style>
