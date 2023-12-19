<template>
  <div class="outerContainer">
    <div class="innerContainer">
      <h2>Edit cat</h2>

      <form autocomplete="on">
        <div class="inputContainer">
          <label for="name">*Name:</label>
          <input
            id="name"
            v-model="newCat.name"
            class="formLine"
            type="text"
            @focusout="checkFormName"
          />

          <p>{{ errorTextName }}</p>
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
            @blur="checkFormColor"
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
            type="url"
            @blur="checkFormImage"
          />

          <p>{{ errorTextImage }}</p>
        </div>

        <div id="checkboxContainer" class="inputContainer">
          <label for="adopted">Adopted:</label>
          <input id="adopted" v-model="newCat.adopted" type="checkbox" />
        </div>

        <div class="buttonContainer">
          <action-button type="primary" text="Update cat" @click="checkForm" />
        </div>
      </form>
    </div>
  </div>

  <confirmation-modal
    v-if="showConfirmationModal"
    v-on-click-outside="closeModal"
    :name="newCat.name"
    action="edited"
    @close="closeModal"
  />
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import ConfirmationModal from "@/components/Shared/ConfirmationModal.vue"
import { computed, ref } from "vue"

import { useCatsStore } from "@/stores/cats"
import { useRoute } from "vue-router"

import { vOnClickOutside } from "@vueuse/components"
import type { Cat } from "@/api/types"

const catsStore = useCatsStore()

const numbers = /\d/

const route = useRoute()
const editCatId = computed(() => +route.params.id)

catsStore.GET_UNIQUE_CAT(editCatId.value)

const errorTextName = ref<string>("")
const errorTextAge = ref<string>("")
const errorTextColor = ref<string>("")
const errorTextImage = ref<string>("")

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
  } else errorTextColor.value = ""
}

const checkForm = () => {
  if (
    errorTextName.value === "" &&
    errorTextAge.value === "" &&
    errorTextColor.value === "" &&
    errorTextImage.value === ""
  ) {
    catsStore.UPDATE_CAT(newCat.value)
    openModal()
    if (newCat.value.adopted) {
      catsStore.DELETE_CAT(newCat.value.id)
    }
  }
}

const newCat = ref<Cat>({
  id: 0,
  adopted: false,
  name: "",
  color: "",
  age: 1,
  image: ""
})

newCat.value = catsStore.uniqueCat

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
  padding: 10px 0;
}

#checkboxContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;

  input[type="checkbox"] {
    appearance: none;
    background-color: white;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid $bgColor;
    border-radius: 20%;
    display: grid;
    place-content: center;

    &:hover {
      background-color: $buttonBgColor;
    }
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.7em;
    height: 0.75em;
    border-radius: 20%;
    transform: scale(0);
    transition: 100ms transform ease-in-out;
    box-shadow: inset 1em 1em $buttonColor;
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
}

label {
  padding: 5px 0;
  font-weight: 500;
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
  align-items: center;
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
  width: 100%;
  height: 40px;
}

.buttonContainer {
  margin-top: 40px;
  margin-bottom: 30px;
  padding: 10px 0;
  width: 100%;
}

p {
  margin: 0;
  padding-top: 5px;
  font-size: large;
  height: 26px;

  color: rgb(182, 21, 21);
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
