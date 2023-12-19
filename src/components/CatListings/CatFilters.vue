<template>
  <div class="filterContainer otherClass">
    <div class="searchName">
      <h2>Search by name:</h2>
      <div class="inputContainer">
        <input
          v-model.trim="nameSearchTerm"
          type="text"
          placeholder="e.g. Mrvica"
          class="textInput"
        />

        <font-awesome-icon :icon="['fas', 'search']" class="icon" />
      </div>
    </div>

    <div class="sortBy">
      <h2>Sort by:</h2>

      <radio-button
        :is-checked="userStore.ageChecked"
        value="Age"
        name="sortBy"
      />

      <radio-button
        :is-checked="userStore.nameChecked"
        value="Name"
        name="sortBy"
      />
    </div>

    <div class="sortType">
      <h2>Sort type:</h2>
      <radio-button
        :is-checked="userStore.ascendingChecked"
        value="Ascending"
        name="sortType"
      />
      <radio-button
        :is-checked="userStore.descendingChecked"
        value="Descending"
        name="sortType"
      />
    </div>

    <div class="filters">
      <h2>Filters:</h2>
      <check-box
        :is-checked="userStore.sixChecked"
        :action="userStore.ADD_YOUNGER_THAN_6"
        value="Younger than 6 months"
      />
      <check-box
        :is-checked="userStore.tenChecked"
        :action="userStore.ADD_YOUNGER_THAN_10"
        value="Younger than 10 months"
      />
      <check-box
        :is-checked="userStore.blackChecked"
        :action="userStore.ADD_BLACK_CATS"
        value="Black fur color"
      />
    </div>
  </div>
  <div v-if="type === 'sm'" class="filtersButton" @click="changeStyle()">
    <action-button type="primary" text="Filters" class="filterButton" />
    <font-awesome-icon :icon="['fas', 'filter']" />
  </div>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue"
import RadioButton from "@/components/Shared/RadioButton.vue"
import CheckBox from "@/components/Shared/CheckBox.vue"

import { useUserStore } from "@/stores/user"
import { computed, onMounted, onUnmounted, ref } from "vue"

const userStore = useUserStore()

//search by name
const nameSearchTerm = computed({
  get() {
    return userStore.nameSearchTerm
  },
  set(name: string) {
    userStore.UPDATE_NAME_SEARCH_TERM(name)
  }
})

const changeStyle = () => {
  const element = document.querySelector(".filterContainer")

  element?.classList.toggle("hide-class")
  element?.classList.toggle("new-class")
}

const hideFilters = () => {
  const element = document.querySelector(".filterContainer")
  element?.classList.remove("otherClass")
  element?.classList.add("hide-class")
}

const showFilters = () => {
  const element = document.querySelector(".filterContainer")
  element?.classList.add("otherClass")
  element?.classList.remove("hide-class")
}

//deciding on window type on window resize
const useBreakpoints = () => {
  let windowWidth = ref(window.innerWidth)

  const onWidthChange = () => (windowWidth.value = window.innerWidth)
  onMounted(() => window.addEventListener("resize", onWidthChange))
  onUnmounted(() => window.removeEventListener("resize", onWidthChange))

  const type = computed(() => {
    console.log("window", windowWidth.value)

    if (windowWidth.value < 700) {
      console.log(type.value)
      hideFilters()
      return "sm"
    } else {
      console.log(type.value)
      showFilters()
      return "lg"
    }
  })

  return { type }
}

const { type } = useBreakpoints()
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";

.filterButton {
  border: 0;
}

.filtersButton {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: max-content;

  border: solid;
  border-radius: 5%;

  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;

  background-color: $buttonBgColor;
  &:hover {
    background-color: $buttonHoverBgColor;
  }
}

.new-class {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.hide-class {
  display: none;
}

.otherClass {
  width: 250px;
  position: sticky;
  top: 80px;
}

.filterContainer {
  font-family: $primaryFontFamily;
  padding-left: 10px;

  .sortBy,
  .sortType,
  .filters {
    display: flex;
    flex-direction: column;
  }
  .inputContainer {
    height: 35px;
    width: 250px;

    box-sizing: border-box;
    border: 2px solid black;
    border-radius: 4px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .inputContainer:focus-within {
    border: 4px solid $bgColor;
  }
  .textInput {
    font-family: $primaryFontFamily;

    width: 100%;
    line-height: 80%;
    font-size: large;

    border: none;
    outline: none;
  }

  .icon {
    padding: 4px;
  }
}
</style>
