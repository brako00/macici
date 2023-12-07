<template>
  <div @click="props.action">
    <div @click="handleChange()">
      <input
        :id="props.value"
        :value="/props.value/i"
        type="checkbox"
        class="checkbox"
        :checked="props.isChecked"
        @change="handleChange(), props.action"
      />
      <label for="props.value"> {{ props.value }} </label>
    </div>
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
  action: {
    type: Function,
    required: true
  },
  isChecked: {
    type: Boolean,
    required: true
  }
})

const handleChange = () => {
  if (props.value === "Younger than 6 months")
    userStore.sixChecked = !userStore.sixChecked

  if (props.value === "Younger than 10 months")
    userStore.tenChecked = !userStore.tenChecked

  if (props.value === "Black fur color")
    userStore.blackChecked = !userStore.blackChecked
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

  input::before {
    content: "";
    width: 0.7em;
    height: 0.75em;
    border-radius: 20%;
    transform: scale(0);
    transition: 100ms transform ease-in-out;
    box-shadow: inset 1em 1em blueviolet;
  }

  input:checked::before {
    transform: scale(1);
  }
}
</style>
