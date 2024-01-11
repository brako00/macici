<template>
  <div class="outer" @click="props.action">
    <div class="inner" @click="handleChange()">
      <input
        :id="props.value"
        :value="/props.value/i"
        type="checkbox"
        class="checkbox"
        :checked="props.isChecked"
      />
      <label :for="props.value"> {{ props.value }} </label>
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

  if (props.value === "adopted") props.action
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
    border-radius: 20%;
  }

  input::before {
    content: "";
    width: 0.7em;
    height: 0.75em;
    border-radius: 20%;

    transform: scale(0);
    transition: 100ms transform ease-in-out;
    box-shadow: inset 1em 1em $buttonColor;
  }

  input:checked::before {
    transform: scale(1);
  }
}

.inner {
  width: 100%;
}

div:hover > input {
  background-color: $primaryColor;
}
</style>
