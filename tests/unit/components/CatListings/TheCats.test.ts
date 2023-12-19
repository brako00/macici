import { render, screen } from "@testing-library/vue"
import { createTestingPinia } from "@pinia/testing"

import { RouterLinkStub } from "@vue/test-utils"
import userEvent from "@testing-library/user-event"

import TheCats from "@/components/CatListings/TheCats.vue"

import { useCatsStore } from "@/stores/cats"

describe("TheCats", () => {
  const renderTheCats = () => {
    const pinia = createTestingPinia()
    const catsStore = useCatsStore()

    render(TheCats, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    })
    return { catsStore }
  }

  it("fetches the cats", () => {
    const { catsStore } = renderTheCats()
    expect(catsStore.FETCH_CATS).toHaveBeenCalled()
  })

  it("displays maximum 20 cats", async () => {
    const { catsStore } = renderTheCats()
    //@ts-expect-error Getters are readonly
    catsStore.FILTERED_CATS = Array(26).fill({})

    const allCats = await screen.findAllByRole("catCard")
    expect(allCats).toHaveLength(20)
  })

  it("shows all cats after click on a button", async () => {
    const { catsStore } = renderTheCats()
    //@ts-expect-error Getters are readonly
    catsStore.FILTERED_CATS = Array(26).fill({})

    const button = await screen.findByRole("button", {
      name: /Show more/i
    })
    await userEvent.click(button)

    const allCats = await screen.findAllByRole("catCard")
    expect(allCats).toHaveLength(26)
  })

  it("shows error message if there are no matches", () => {
    const { catsStore } = renderTheCats()
    //@ts-expect-error Getters are readonly
    catsStore.FILTERED_CATS = []

    const errorMessage = screen.getByText(
      "Unfortunatelly we can't find your desired cat"
    )

    expect(errorMessage).toBeInTheDocument()
  })
})
