<template>
  <section class="allCats">
    <div v-for="cat in YOUNGEST_CATS" :key="cat.id">
      <div class="carouselCat">
        <img :src="cat.image" />
        <div class="catName">
          {{ cat.name }}
        </div>
      </div>
    </div>
    <font-awesome-icon :icon="['fas', 'chevron-circle-left']" class="icon" />
    <font-awesome-icon :icon="['fas', 'chevron-circle-right']" class="icon" />
  </section>
</template>

<script lang="ts" setup>
import { useCatsStore } from "@/stores/cats"
import { computed, onMounted } from "vue"

const catsStore = useCatsStore()
onMounted(() => {
  console.log("nesto", catsStore.YOUNGEST_CATS)

  console.log(YOUNGEST_CATS.value)
})

const YOUNGEST_CATS = computed(() => catsStore.YOUNGEST_CATS)

let slideIndex = 1

// Next/previous controls
function plusSlides(n: number) {
  showSlides((slideIndex += n))
}

// Thumbnail image controls
function currentSlide(n: number) {
  showSlides((slideIndex = n))
}

const showSlides = (n: number) => {
  // let slides = YOUNGEST_CATS
  YOUNGEST_CATS.value[0]
  // if (n > slides.length) {
  //   slideIndex = 1
  // }
  // if (n < 1) {
  //   slideIndex = slides.length
  // }
  // for (let i = 0; i < slides.length; i++) {
  //   slides[i].classList.add("displayNone")
  // }
  // slides[slideIndex - 1].className = "displayBlock"
}
showSlides(slideIndex)
</script>

<style lang="scss">
.displayNone {
  display: none;
}

.displayBlock {
  display: "block";
}
.allCats {
  // display: flex;
  // flex-direction: row;
  // overflow: hidden;
  .carouselCat {
    // display: flex;
    // justify-content: center;
    // align-items: center;

    // display: none;

    img {
      height: 500px;
      width: 700px;
      object-fit: fill;
    }
  }
}
.icon {
  cursor: pointer;
  top: 50%;
  height: 50px;
  width: 50px;

  padding: 16px;

  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}
.catName {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

// .fade {
//   animation-name: fade;
//   animation-duration: 1.5s;
// }
// @keyframes fade {
//   from {
//     opacity: 0.4;
//   }
//   to {
//     opacity: 1;
//   }
// }
</style>
