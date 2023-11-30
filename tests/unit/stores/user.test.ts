import { createPinia, setActivePinia } from "pinia"

import { useUserStore } from "@/stores/user"

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("keeps track if age is checked", () => {
    const store = useUserStore()
    expect(store.ageChecked).toBe(true)
  })

  it("keeps track if name is checked", () => {
    const store = useUserStore()
    expect(store.nameChecked).toBe(false)
  })

  it("keeps track if ascending is checked", () => {
    const store = useUserStore()
    expect(store.ascendingChecked).toBe(true)
  })

  it("keeps track if descending is checked", () => {
    const store = useUserStore()
    expect(store.descendingChecked).toBe(false)
  })

  it("stores ages of cats that are less than 6 months old", () => {
    const store = useUserStore()
    expect(store.selectedYoungerThan6).toEqual([])
  })

  it("stores ages of cats that are less than 10 months old", () => {
    const store = useUserStore()
    expect(store.selectedYoungerThan10).toEqual([])
  })

  it("stores black fur color", () => {
    const store = useUserStore()
    expect(store.selectedColorBlack).toEqual("")
  })

  it("stores user's search term for cats name", () => {
    const store = useUserStore()
    expect(store.nameSearchTerm).toEqual("")
  })
})

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("ADD_YOUNGER_THAN_6", () => {
    it("updates ages less than 6", () => {
      const store = useUserStore()
      store.ADD_YOUNGER_THAN_6()
      expect(store.selectedYoungerThan6).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe("ADD_YOUNGER_THAN_10", () => {
    it("updates ages less than 10", () => {
      const store = useUserStore()
      store.ADD_YOUNGER_THAN_10()
      expect(store.selectedYoungerThan10).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
  })

  describe("ADD_BLACK_CATS", () => {
    it("updates black color", () => {
      const store = useUserStore()
      store.ADD_BLACK_CATS()
      expect(store.selectedColorBlack).toBe("Black")
    })
  })

  describe("UPDATE_NAME_SEARCH_TERM", () => {
    it("recieves search term for name of cat the user has entered", () => {
      const store = useUserStore()
      store.UPDATE_NAME_SEARCH_TERM("Medo")
      expect(store.nameSearchTerm).toBe("Medo")
    })
  })
})
