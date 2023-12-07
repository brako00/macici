<template>
  <div class="outerContainer">
    <div class="innerContainer">
      <h2>Edit cat</h2>

      <form @submit="catsStore.UPDATE_CAT(newCat)" autocomplete="on">
        <div class="inputContainer">
          <label for="name">Name:</label>
          <input
            id="name"
            v-model="newCat.name"
            class="formLine"
            type="text"
            @blur="checkFormName"
          />
        </div>

        <div class="inputContainer">
          <label for="age">Age:</label>
          <input id="age" v-model="newCat.age" type="number" min="1" max="12" />
        </div>

        <div class="inputContainer">
          <label for="color">Color:</label>
          <select
            id="color"
            v-model="newCat.color"
            class="formLine"
            @blur="checkFormColor"
          >
            <option v-for="color in colors" :key="color">{{ color }}</option>
          </select>
        </div>

        <div class="inputContainer">
          <label for="image">Image:</label>
          <input
            id="image"
            v-model="newCat.image"
            class="formLine"
            type="url"
            @blur="checkFormImage"
          />
        </div>

        <!-- <div>
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div> -->

        <div class="buttonContainer">
          <button type="submit" @click="openModal">Update cat</button>
        </div>
      </form>
    </div>
    <confirmation-modal
      v-if="showConfirmationModal"
      v-on-click-outside="closeModal"
      :cat="newCat"
      action="edited"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import ConfirmationModal from "./Shared/ConfirmationModal.vue"
import { computed, ref } from "vue"

import { useCatsStore } from "@/stores/cats"
import { useRoute } from "vue-router"

import { vOnClickOutside } from "@vueuse/components"

const catsStore = useCatsStore()

const errors = new Set<string>()

const numbers = /\d/

const route = useRoute()
const editCatId = computed(() => +route.params.id)

catsStore.GET_UNIQUE_CAT(editCatId.value)

const newCat = catsStore.uniqueCat

const checkFormName = () => {
  if (newCat.name === "") errors.add("Name is required")
  if (numbers.test(newCat.name)) errors.add("Name should not have numbers")
}
const checkFormColor = () => {
  if (newCat.color === "") errors.add("Color is required")
}
const checkFormImage = () => {
  if (newCat.image === "") errors.add("Image URL is required")
}

const colors = [
  "Black",
  "White",
  "Gray",
  "Yellow",
  "Beige",
  "Tabby",
  "Calico",
  "Point",
  "Tortoiseshell"
]

const showConfirmationModal = ref<boolean>(false)

const openModal = () => {
  showConfirmationModal.value = true
}

const closeModal = () => {
  showConfirmationModal.value = false
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

.outerContainer {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 30px;
  font-family: $primaryFontFamily;
  font-size: x-large;
}

// .formLine {
//   width: 100%;
// }

.inputContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
}

label {
  padding: 5px 0;
}

.innerContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;

  background-color: $bgColor;
  border-radius: 2%;
}

h2 {
  font-family: $secondaryFontFamily;
}

form {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 400px;
}

input,
select {
  line-height: 80%;
  font-size: x-large;
}

button {
  line-height: 100%;
  font-size: x-large;
  font-family: $primaryFontFamily;
}

.buttonContainer {
  margin-top: 40px;
  margin-bottom: 30px;
  padding: 10px;
  width: 100%;
}
button {
  width: 100%;
}
</style>
