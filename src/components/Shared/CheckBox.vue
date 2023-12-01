<template>
  <div @click="props.action">
    <input
      :id="props.value"
      :value="/props.value/i"
      type="checkbox"
      class="checkbox"
      @change="props.action"
    />
    <label for="props.value"> {{ props.value }} </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: String,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
})
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
