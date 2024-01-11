<template>
  <section>
    <div class="allCats">
      <div v-for="cat in carouselCats" :key="cat.id">
        <div
          class="carouselCat"
          :class="{
            activeCat: isCatActive(cat),
            subActiveCat: !isCatActive(cat)
          }"
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
          @mouseout="continueInterval()"
        />

        <font-awesome-icon
          :icon="['fas', 'chevron-circle-right']"
          class="iconRight"
          @click="(direction = true), goingRight()"
          @mouseover="pauseInterval()"
          @mouseout="continueInterval()"
        />
      </div>

      <modal-cat
        v-if="showModalCat"
        v-on-click-outside="closeModal"
        :cat-i-d="carouselCats[1].id"
        @close="closeModal"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import ModalCat from "@/components/Carousel/ModalCat.vue"

import { ref, onMounted, onBeforeUnmount } from "vue"
import { vOnClickOutside } from "@vueuse/components"

import type { Cat } from "@/api/types"
import { useCatsStore } from "@/stores/cats"

const showModalCat = ref<boolean>(false)

const catsStore = useCatsStore()

const carouselCats = ref<Cat[]>([])

const activeIndex = ref<number>(1)
const activeIndexYoungestCats = ref<number>(0)

const interval = ref<ReturnType<typeof setInterval>>()
const lengthOfInterval = 3000

const direction = ref<boolean>(true)

const initializeCarousel = () => {
  //creates array of 3 elements with active cat in the middle
  carouselCats.value.push(
    catsStore.YOUNGEST_CATS[0],
    catsStore.YOUNGEST_CATS[1]
  )
  carouselCats.value.unshift(catsStore.YOUNGEST_CATS[3])

  pauseInterval()
  continueInterval()

  setTimeout(() => {
    const firstActive = document.querySelector(".activeCat")
    if (firstActive !== null)
      firstActive.addEventListener("click", () => {
        openModal()
      })
  }, 500)
}

onMounted(async () => {
  await catsStore.FETCH_CATS()

  initializeCarousel()
})

onBeforeUnmount(() => {
  pauseInterval()
})

const isCatActive = (cat: Cat) => {
  return carouselCats.value.indexOf(cat) === activeIndex.value
}

const pauseInterval = () => {
  clearInterval(interval.value)
}

const continueInterval = () => {
  interval.value = setInterval(displayedCats, lengthOfInterval)
}

//stopping auto changing images in carousel on hover
const stoppingOnHover = (active: Element) => {
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

    active.addEventListener("click", () => {
      openModal()
    })
  } else {
    goingLeft()

    const active = document.querySelectorAll(".subActiveCat")[0]
    stoppingOnHover(active)

    active.addEventListener("click", () => {
      openModal()
    })
  }
}

const openModal = () => {
  showModalCat.value = true
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
