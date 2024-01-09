import { render, screen } from "@testing-library/vue"

import { createCat } from "../../../utils/createCat"

import AdoptModal from "@/components/Shared/AdoptModal.vue"
import { createTestingPinia } from "@pinia/testing"
import userEvent from "@testing-library/user-event"
import { useCatsStore } from "@/stores/cats"

describe("AdoptModal", () => {
  const renderAdoptModal = () => {
    const pinia = createTestingPinia()
    const cat = createCat({ id: 1 })

    render(AdoptModal, {
      props: {
        cat: cat,
        action: "adopt"
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        },
        plugins: [pinia]
      }
    })
  }
  it("renders text inside adopt modal", () => {
    renderAdoptModal()

    const banner = screen.getByText("Once you click Adopt it is yours")
    expect(banner).toBeInTheDocument()
  })

  it("performs an action after button click", async () => {
    renderAdoptModal()

    const button = screen.getByRole("button", {
      name: /Adopt/i
    })

    await userEvent.click(button)

    const catsStore = useCatsStore()
    expect(catsStore.UPDATE_ADOPTED).toHaveBeenCalled()
  })
})
