import { defineStore } from "pinia"
import { ref } from "vue"

import getCats from "@/api/getCats"

import type { Cat } from "@/api/types"

export const useCatsStore = defineStore("cats", () => {
  const cats = ref(<Cat[]>[])

  const FETCH_CATS = async () => {
    const recievedCats = await getCats()
    cats.value = recievedCats
  }

  return { cats, FETCH_CATS }
})
