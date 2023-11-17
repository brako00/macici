import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const ageChecked = ref<boolean>(true)
  const nameChecked = ref<boolean>(false)
  const ascendingChecked = ref<boolean>(true)
  const descendingChecked = ref<boolean>(false)

  return {
    ageChecked,
    nameChecked,
    ascendingChecked,
    descendingChecked
  }
})
