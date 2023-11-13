import { defineStore } from "pinia"
import { ref, computed } from "vue"

import getCats from "@/api/getCats"

import type { Cat } from "@/api/types"

export const useCatsStore = defineStore("cats", () => {
  const cats = ref(<Cat[]>[])

  const FETCH_CATS = async () => {
    const recievedCats = await getCats()
    cats.value = recievedCats.sort((a, b) => a.age - b.age)
  }

  const INCLUDE_YOUNGER_THAN_6 = () => {}

  const FILTERED_CATS = computed(() => {
    return cats.value
      .filter((cat) => {
        if (cat.age < 6) return true
      })
      .filter((cat) => {
        if (cat.age < 10) return true
      })
      .filter((cat) => {
        if (cat.color === "Black") return true
      })
  })

  return { cats, FETCH_CATS, INCLUDE_YOUNGER_THAN_6, FILTERED_CATS }
})
