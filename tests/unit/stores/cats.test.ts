import { createPinia, setActivePinia } from "pinia"
import axios from "axios"
import type { Mock } from "vitest"

import { useCatsStore } from "@/stores/cats"
import { useUserStore } from "@/stores/user"
import { createCat } from "../../utils/createCat"

vi.mock("axios")
const axiosGetMock = axios.get as Mock

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("stores array of all cats", () => {
    const store = useCatsStore()
    expect(store.cats).toEqual([])
  })

  it("stores array of 4 youngest cats", () => {
    const store = useCatsStore()
    expect(store.YOUNGEST_CATS).toEqual([])
  })
})

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("FETCH_CATS", () => {
    it("makes API request and stores received cats", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Cat 1", "Cat 2"] })
      const store = useCatsStore()
      await store.FETCH_CATS()
      expect(store.cats).toEqual(["Cat 1", "Cat 2"])
    })
  })
})

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("YOUNGER_THAN_6", () => {
    describe("when user has not selected this filter", () => {
      it("includes cat", () => {
        const userStore = useUserStore()
        userStore.selectedYoungerThan6 = []
        const store = useCatsStore()
        const cat = createCat({ age: 12 })

        const result = store.YOUNGER_THAN_6(cat)

        expect(result).toBe(true)
      })
    })

    it("finds cats younger than 6 months", () => {
      const userStore = useUserStore()
      userStore.selectedYoungerThan6 = [1, 2]
      const store = useCatsStore()
      const cat = createCat({ age: 2 })

      const result = store.YOUNGER_THAN_6(cat)

      expect(result).toBe(true)
    })
  })

  describe("YOUNGER_THAN_10", () => {
    describe("when user has not selected this filter", () => {
      it("includes cat", () => {
        const userStore = useUserStore()
        userStore.selectedYoungerThan6 = []
        const store = useCatsStore()
        const cat = createCat({ age: 12 })

        const result = store.YOUNGER_THAN_6(cat)

        expect(result).toBe(true)
      })
    })

    it("finds cats younger than 10 months", () => {
      const userStore = useUserStore()
      userStore.selectedYoungerThan10 = [1, 2, 9]
      const store = useCatsStore()
      const cat = createCat({ age: 9 })

      const result = store.YOUNGER_THAN_10(cat)

      expect(result).toBe(true)
    })
  })

  describe("BLACK_CATS", () => {
    describe("when user has not selected this filter", () => {
      it("includes cat", () => {
        const userStore = useUserStore()
        userStore.selectedColorBlack = ""
        const store = useCatsStore()
        const cat = createCat({ color: "White" })

        const result = store.BLACK_CATS(cat)

        expect(result).toBe(true)
      })
    })

    it("finds cats with black fur color", () => {
      const userStore = useUserStore()
      userStore.selectedColorBlack = "Black"
      const store = useCatsStore()
      const cat = createCat({ color: "Black" })

      const result = store.BLACK_CATS(cat)

      expect(result).toBe(true)
    })
  })

  describe("INCLUDE_BY_NAME", () => {
    describe("when user has not selected this filter", () => {
      it("includes cat", () => {
        const userStore = useUserStore()
        userStore.nameSearchTerm = ""
        const store = useCatsStore()
        const cat = createCat({ name: "Miki" })

        const result = store.INCLUDE_BY_NAME(cat)

        expect(result).toBe(true)
      })
    })

    it("finds cats with black fur color", () => {
      const userStore = useUserStore()
      userStore.nameSearchTerm = "MiKI"
      const store = useCatsStore()
      const cat = createCat({ name: "Miki" })

      const result = store.INCLUDE_BY_NAME(cat)

      expect(result).toBe(true)
    })
  })
})
