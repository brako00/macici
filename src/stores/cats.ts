import { defineStore } from "pinia"
import { ref, computed } from "vue"

import getCats from "@/api/getCats"

import type { Cat } from "@/api/types"

import { useUserStore } from "@/stores/user"

export const useCatsStore = defineStore("cats", () => {
  const cats = ref(<Cat[]>[])

  const FETCH_CATS = async () => {
    const recievedCats = await getCats()
    cats.value = recievedCats.sort((a, b) => a.age - b.age)
  }

  const selectedYoungerThan6 = ref<number[]>([])

  const ADD_YOUNGER_THAN_6 = () => {
    if (selectedYoungerThan6.value.length === 0)
      selectedYoungerThan6.value = [1, 2, 3, 4, 5]
    else selectedYoungerThan6.value = []
  }

  const YOUNGER_THAN_6 = (cat: Cat): boolean => {
    if (selectedYoungerThan6.value.length === 0) return true
    if (cat.age < 6) return true
    return false
  }

  const selectedYoungerThan10 = ref<number[]>([])

  const ADD_YOUNGER_THAN_10 = () => {
    if (selectedYoungerThan10.value.length === 0)
      selectedYoungerThan10.value = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    else selectedYoungerThan10.value = []
  }

  const YOUNGER_THAN_10 = (cat: Cat): boolean => {
    if (selectedYoungerThan10.value.length === 0) return true
    if (cat.age < 10) return true
    return false
  }

  const selectedColorBlack = ref<string>("")

  const ADD_BLACK_CATS = () => {
    if (selectedColorBlack.value === "") selectedColorBlack.value = "Black"
    else selectedColorBlack.value = ""
  }

  const BLACK_CATS = (cat: Cat): boolean => {
    if (selectedColorBlack.value === "") return true
    if (selectedColorBlack.value === cat.color) return true
    return false
  }

  const nameSearchTerm = ref<string>("")

  const UPDATE_NAME_SEARCH_TERM = (term: string) => {
    nameSearchTerm.value = term
  }

  const INCLUDE_BY_NAME = (cat: Cat) => {
    return cat.name.toLowerCase().includes(nameSearchTerm.value.toLowerCase())
  }

  const SORTED_CATS = computed(() => {
    const userStore = useUserStore()
    if (userStore.ascendingChecked) {
      if (userStore.ageChecked) {
        return cats.value.sort((a, b) => a.age - b.age)
      } else {
        return cats.value.sort((a, b) => {
          const nameA = a.name.toLowerCase()
          const nameB = b.name.toLowerCase()
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0
        })
      }
    } else {
      if (userStore.ageChecked) {
        return cats.value.sort((a, b) => b.age - a.age)
      } else {
        return cats.value.sort((a, b) => {
          const nameA = a.name.toLowerCase()
          const nameB = b.name.toLowerCase()
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
        })
      }
    }
  })

  const FILTERED_CATS = computed(() => {
    return SORTED_CATS.value
      .filter((cat) => YOUNGER_THAN_6(cat))
      .filter((cat) => YOUNGER_THAN_10(cat))
      .filter((cat) => BLACK_CATS(cat))
      .filter((cat) => INCLUDE_BY_NAME(cat))
  })

  return {
    cats,
    FETCH_CATS,
    YOUNGER_THAN_6,
    YOUNGER_THAN_10,
    BLACK_CATS,
    ADD_BLACK_CATS,
    ADD_YOUNGER_THAN_6,
    ADD_YOUNGER_THAN_10,
    FILTERED_CATS,
    nameSearchTerm,
    UPDATE_NAME_SEARCH_TERM,
    INCLUDE_BY_NAME,
    SORTED_CATS
  }
})
