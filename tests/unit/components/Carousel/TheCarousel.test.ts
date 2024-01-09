import { render, screen } from "@testing-library/vue"
import { createTestingPinia } from "@pinia/testing"

import TheCarousel from "@/components/Carousel/TheCarousel.vue"

import { useCatsStore } from "@/stores/cats"
import { createCat } from "../../../utils/createCat"

describe("TheCarousel", () => {
  const renderTheCarousel = () => {
    const pinia = createTestingPinia()
    const catsStore = useCatsStore()

    render(TheCarousel, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        },
        plugins: [pinia]
      }
    })
    return { catsStore }
  }

  it("checks if youngest cats has the desired length", () => {
    const { catsStore } = renderTheCarousel()

    const cat1 = createCat({ id: 1 })
    const cat2 = createCat({ id: 2 })
    const cat3 = createCat({ id: 3 })
    const cat4 = createCat({ id: 4 })

    //@ts-expect-error Getters are readonly
    catsStore.YOUNGEST_CATS = [cat1, cat2, cat3, cat4]

    screen.debug()

    expect(catsStore.YOUNGEST_CATS).toHaveLength(4)
  })
})
