<template>
  <div class="outerContainer">
    <div class="innerContainer">
      <h2>Create new cat</h2>

      <form autocomplete="on">
        <div class="inputContainer">
          <label for="name">*Name:</label>
          <input
            id="name"
            v-model="newCat.name"
            class="formLine"
            type="text"
            style="text-transform: capitalize"
            @focusout="checkFormName"
          />

          <p class="errorName visibilityClass">{{ errorTextName }}</p>
        </div>

        <div class="inputContainer">
          <label for="age">*Age:</label>
          <input
            id="age"
            v-model="newCat.age"
            type="number"
            min="1"
            max="12"
            @focusout="checkFormAge"
          />

          <p>{{ errorTextAge }}</p>
        </div>

        <div class="inputContainer">
          <label for="color">*Color:</label>
          <select
            id="color"
            v-model="newCat.color"
            class="formLine"
            @focusout="checkFormColor"
          >
            <option v-for="color in colors" :key="color">{{ color }}</option>
          </select>

          <p>{{ errorTextColor }}</p>
        </div>

        <div class="inputContainer">
          <label for="image">*Image:</label>
          <input
            id="image"
            v-model="newCat.image"
            class="formLine"
            type="text"
            @focusout="checkFormImage"
          />

          <p>{{ errorTextImage }}</p>
        </div>

        <div class="buttonContainer">
          <action-button type="primary" text="Create cat" @click="checkForm" />
        </div>
      </form>
    </div>
  </div>
  <confirmation-modal
    v-if="showConfirmationModal"
    v-on-click-outside="closeModal"
    :name="newCat.name"
    action="created"
    @close="closeModal"
  />
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import ConfirmationModal from "@/components/Shared/ConfirmationModal.vue"

import { ref } from "vue"
import { vOnClickOutside } from "@vueuse/components"

import type { Cat } from "@/api/types"
import { useCatsStore } from "@/stores/cats"

const catsStore = useCatsStore()

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

const numbers = /\d/

const errorTextName = ref<string>("")
const errorTextAge = ref<string>("")
const errorTextColor = ref<string>("")
const errorTextImage = ref<string>("")

const showConfirmationModal = ref<boolean>(false)

//checking input fields
const checkFormName = () => {
  if (newCat.value.name === "") {
    errorTextName.value = "Name is required"
  } else if (numbers.test(newCat.value.name)) {
    errorTextName.value = "Name should not have numbers"
  } else errorTextName.value = ""
}

const checkFormAge = () => {
  if (newCat.value.age < 1) {
    errorTextAge.value = "Age should be a positive number"
  } else if (newCat.value.age > 12) {
    errorTextAge.value = "Age should be a less than 13"
  } else errorTextAge.value = ""
}

const checkFormColor = () => {
  if (newCat.value.color === "") {
    errorTextColor.value = "Color is required"
  } else errorTextColor.value = ""
}

const checkFormImage = () => {
  if (newCat.value.image === "") {
    errorTextImage.value = "Image is required"
  } else if (
    // eslint-disable-next-line no-useless-escape
    !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
      newCat.value.image
    )
  ) {
    errorTextImage.value = "Image should be a valid URL"
  } else errorTextImage.value = ""
}

//if all input fields are in correct form create cat
const checkForm = () => {
  if (
    errorTextName.value === "" &&
    errorTextAge.value === "" &&
    errorTextColor.value === "" &&
    errorTextImage.value === ""
  ) {
    openModal()
    catsStore.ADD_CAT(newCat.value)
  }
}

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
.innerContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 50%;

  background-color: $bgColor;
  border-radius: 2%;

  h2 {
    font-family: $secondaryFontFamily;
  }
}
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 400px;
}
.inputContainer {
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-top: 5px;

  input,
  select {
    line-height: 80%;
    font-size: x-large;
    font-family: $primaryFontFamily;
  }

  label {
    padding: 5px 0;
    font-weight: 500;
  }

  p {
    margin: 0;
    padding-top: 5px;
    font-size: large;
    height: 26px;

    color: rgb(182, 21, 21);
  }
}

.buttonContainer {
  margin-top: 40px;
  margin-bottom: 30px;

  padding: 10px 0;
  width: 100%;
}

button {
  width: 100%;
  height: 40px;
}

@media only screen and (max-width: 900px) {
  .innerContainer {
    width: 100%;
  }
}
@media only screen and (max-width: 500px) {
  form {
    width: 100%;
  }
  .inputContainer,
  .buttonContainer {
    width: 80%;
  }
}
</style>
