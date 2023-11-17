<template>
  <div class="filterContainer">
    <div class="searchName">
      <h2>Search by name:</h2>
      <input
        v-model.trim="nameSearchTerm"
        type="text"
        placeholder="Mrvica"
        class="textInput"
      />
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
        :action="catsStore.ADD_YOUNGER_THAN_6"
        value="Younger than 6 months"
      />
      <check-box
        :action="catsStore.ADD_YOUNGER_THAN_10"
        value="Younger than 10 months"
      />
      <check-box :action="catsStore.ADD_BLACK_CATS" value="Black fur color" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RadioButton from "@/components/Shared/RadioButton.vue"
import CheckBox from "@/components/Shared/CheckBox.vue"

import { useCatsStore } from "@/stores/cats"
import { useUserStore } from "@/stores/user"
import { computed } from "vue"

const userStore = useUserStore()
const catsStore = useCatsStore()

//search by name
const nameSearchTerm = computed({
  get() {
    return catsStore.nameSearchTerm
  },
  set(name: string) {
    catsStore.UPDATE_NAME_SEARCH_TERM(name)
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/globalComponents.scss";
.filterContainer {
  .sortBy,
  .sortType,
  .filters {
    display: flex;
    flex-direction: column;
  }
  .textInput {
    height: 35px;
    width: 200px;
    line-height: 80%;
    font-size: large;
    box-sizing: border-box;
    border: 2px solid black;
    border-radius: 4px;
    outline: none;
  }
  .textInput:focus {
    border: 4px solid $bgColor;
  }
}
</style>
