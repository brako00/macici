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

  it("stores array of recieved cats", () => {
    const store = useCatsStore()
    expect(store.recievedCats).toEqual([])
  })

  it("stores array of all cats", () => {
    const store = useCatsStore()
    expect(store.cats).toEqual([])
  })

  it("keeps track whether to show adopted cats", () => {
    const store = useCatsStore()
    expect(store.showAdopted).toBe(false)
  })

  it("stores empty cat object", () => {
    const store = useCatsStore()
    const newCat = createCat({
      id: 0,
      adopted: false,
      name: "",
      color: "",
      age: 1,
      image: ""
    })
    expect(store.uniqueCat).toEqual(newCat)
  })
})

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("FETCH_CATS", () => {
    it("makes API request and stores received cats", async () => {
      const cat1 = createCat({ name: "Koki" })
      const cat2 = createCat({ name: "Kiki", id: 2 })
      axiosGetMock.mockResolvedValue({ data: [cat1, cat2] })
      const store = useCatsStore()
      await store.FETCH_CATS()
      expect(store.cats).toEqual([cat1, cat2])
    })
  })

  describe("UPDATE_SHOWADOPTED", () => {
    it("changes value of show adopted flag", () => {
      const store = useCatsStore()
      store.UPDATE_SHOWADOPTED()
      expect(store.showAdopted).toBe(true)
    })
  })

  describe("GET_UNIQUE_CAT", () => {
    it("finds cat based on unique id", () => {
      const store = useCatsStore()
      const newCat = createCat({
        id: 11,
        name: "Medo"
      })
      store.cats.push(newCat)

      store.GET_UNIQUE_CAT(11)
      expect(store.uniqueCat.name).toEqual("Medo")
    })
  })

  describe("UPDATE_ADOPTED", () => {
    it("updates adopt flag of the selected cat", () => {
      const store = useCatsStore()
      const newCat = createCat({
        adopted: false
      })
      expect(newCat.adopted).toBe(false)

      store.UPDATE_ADOPTED(newCat)
      expect(newCat.adopted).toBe(true)
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

    it("finds cats with user's search term", () => {
      const userStore = useUserStore()
      userStore.nameSearchTerm = "MiKI"
      const store = useCatsStore()
      const cat = createCat({ name: "Miki" })

      const result = store.INCLUDE_BY_NAME(cat)

      expect(result).toBe(true)
    })
  })
})
