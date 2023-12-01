import { render, screen } from "@testing-library/vue"
import { createTestingPinia } from "@pinia/testing"
import { userEvent } from "@testing-library/user-event"

import TheCarousel from "@/components/Carousel/TheCarousel.vue"

import { useCatsStore } from "@/stores/cats"

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
  it("on click changes image", async () => {})
})
