<template>
  <div>Create new cat</div>
  <div>Edit existing cat</div>
  <div>Delete existing cat</div>

  <form @submit="catsStore.ADD_CAT(newCat)">
    <label for="name">Name:</label>
    <input id="name" v-model="newCat.name" type="text" />

    <label for="age">Age:</label>
    <input id="age" v-model="newCat.age" type="number" min="1" max="12" />

    <label for="color">Color:</label>
    <select id="color" v-model="newCat.color">
      <option v-for="color in colors" :key="color">{{ color }}</option>
    </select>

    <label for="image">Image:</label>
    <input id="image" v-model="newCat.image" type="url" />

    <button @click="checkForm">check form</button>

    <!-- <button type="submit">Create cat</button> -->

    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import type { Cat } from "@/api/types"

import { useCatsStore } from "@/stores/cats"

const catsStore = useCatsStore()

const errors = ref<string[]>([])

const numbers = /\d/

const checkForm = () => {
  if (newCat.value.name === "") errors.value.push("Name is required")
  if (newCat.value.color === "") errors.value.push("Color is required")
  if (newCat.value.image === "") errors.value.push("Image URL is required")
  if (numbers.test(newCat.value.name))
    errors.value.push("Name should not have numbers")
}

const newCat = ref<Cat>({
  id: 0,
  adopted: false,
  name: "",
  color: "",
  age: 1,
  image: ""
})

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
</script>
