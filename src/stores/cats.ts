import { defineStore } from "pinia"
import { ref, computed } from "vue"

import getCats from "@/api/getCats"

import type { Cat } from "@/api/types"

import { useUserStore } from "@/stores/user"

export const useCatsStore = defineStore("cats", () => {
  const cats = ref(<Cat[]>[])
  const YOUNGEST_CATS = ref(<Cat[]>[])

  const FETCH_CATS = async () => {
    const recievedCats = await getCats()
    cats.value = recievedCats.sort((a, b) => a.age - b.age)
    YOUNGEST_CATS.value = cats.value.slice(0, 4)
  }

  const YOUNGER_THAN_6 = (cat: Cat): boolean => {
    const userStore = useUserStore()
    if (userStore.selectedYoungerThan6.length === 0) return true
    if (cat.age < 6) return true
    return false
  }

  const YOUNGER_THAN_10 = (cat: Cat): boolean => {
    const userStore = useUserStore()
    if (userStore.selectedYoungerThan10.length === 0) return true
    if (cat.age < 10) return true
    return false
  }

  const BLACK_CATS = (cat: Cat): boolean => {
    const userStore = useUserStore()
    if (userStore.selectedColorBlack === "") return true
    if (userStore.selectedColorBlack.toLowerCase() === cat.color.toLowerCase())
      return true
    return false
  }

  const INCLUDE_BY_NAME = (cat: Cat) => {
    const userStore = useUserStore()
    return cat.name
      .toLowerCase()
      .includes(userStore.nameSearchTerm.toLowerCase())
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
    YOUNGEST_CATS,
    FETCH_CATS,
    YOUNGER_THAN_6,
    YOUNGER_THAN_10,
    BLACK_CATS,
    INCLUDE_BY_NAME,
    SORTED_CATS,
    FILTERED_CATS
  }
})
