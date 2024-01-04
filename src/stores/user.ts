import { defineStore } from "pinia"
import { ref } from "vue"
import type { Cat } from "@/api/types"

export const useUserStore = defineStore("user", () => {
  const adminLoggedIn = ref<boolean>(false)

  const ageChecked = ref<boolean>(true)
  const nameChecked = ref<boolean>(false)
  const ascendingChecked = ref<boolean>(true)
  const descendingChecked = ref<boolean>(false)

  const sixChecked = ref<boolean>(false)
  const tenChecked = ref<boolean>(false)
  const blackChecked = ref<boolean>(false)

  const selectedYoungerThan6 = ref<number[]>([])
  const selectedYoungerThan10 = ref<number[]>([])
  const selectedColorBlack = ref<string>("")
  const nameSearchTerm = ref<string>("")

  const ADD_YOUNGER_THAN_6 = () => {
    if (selectedYoungerThan6.value.length === 0)
      selectedYoungerThan6.value = [1, 2, 3, 4, 5]
    else selectedYoungerThan6.value = []
  }

  const ADD_YOUNGER_THAN_10 = () => {
    if (selectedYoungerThan10.value.length === 0)
      selectedYoungerThan10.value = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    else selectedYoungerThan10.value = []
  }

  const ADD_BLACK_CATS = () => {
    if (selectedColorBlack.value === "") selectedColorBlack.value = "Black"
    else selectedColorBlack.value = ""
  }

  const UPDATE_NAME_SEARCH_TERM = (term: string) => {
    nameSearchTerm.value = term
  }

  const CLEAR_FILTERS = () => {
    ageChecked.value = true
    ascendingChecked.value = true
    sixChecked.value = false
    tenChecked.value = false
    blackChecked.value = false
    selectedYoungerThan6.value = []
    selectedYoungerThan10.value = []
    selectedColorBlack.value = ""
    nameSearchTerm.value = ""
  }

  return {
    adminLoggedIn,
    ageChecked,
    nameChecked,
    ascendingChecked,
    descendingChecked,
    sixChecked,
    tenChecked,
    blackChecked,
    selectedYoungerThan6,
    selectedYoungerThan10,
    selectedColorBlack,
    nameSearchTerm,
    ADD_YOUNGER_THAN_6,
    ADD_YOUNGER_THAN_10,
    ADD_BLACK_CATS,
    UPDATE_NAME_SEARCH_TERM,

    CLEAR_FILTERS
  }
})
