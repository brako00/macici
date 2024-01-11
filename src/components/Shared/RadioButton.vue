<template>
  <div @click="handleChange(props.name)">
    <input
      :id="props.value"
      :checked="isChecked"
      type="radio"
      class="radioButton"
      :name="props.name"
    />
    <label :for="props.value"> {{ props.value }} </label>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isChecked: {
    type: Boolean,
    required: true
  }
})

const handleChange = (sortValue: String) => {
  if (sortValue === "sortBy") {
    userStore.ageChecked = !userStore.ageChecked
    userStore.nameChecked = !userStore.nameChecked
  } else {
    userStore.ascendingChecked = !userStore.ascendingChecked
    userStore.descendingChecked = !userStore.descendingChecked
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

div {
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;

  label {
    font-size: larger;
  }

  input {
    appearance: none;
    display: grid;
    place-content: center;

    width: 1.15em;
    height: 1.15em;
    background-color: white;

    border: 0.15em solid $primaryColor;
    border-radius: 50%;
  }

  input::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;

    transform: scale(0);
    transition: 100ms transform ease-in-out;
    box-shadow: inset 1em 1em $buttonColor;
  }

  input:checked::before {
    transform: scale(1);
  }
}

div:hover > input {
  background-color: $primaryColor;
}
</style>
