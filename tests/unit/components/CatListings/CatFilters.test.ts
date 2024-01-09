import CatFilters from "@/components/CatListings/CatFilters.vue"
import { useUserStore } from "@/stores/user"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/vue"
import { RouterLinkStub } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"

describe("CatFilters", () => {
  const renderCatFilters = () => {
    setActivePinia(createPinia())
    const userStore = useUserStore()
    userStore.adminLoggedIn = true

    render(CatFilters, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    })
    return { userStore }
  }
  describe("when admin is logged in", () => {
    it("populates search input from store", async () => {
      const { userStore } = renderCatFilters()
      userStore.nameSearchTerm = "Miki"
      const input = await screen.getByRole<HTMLInputElement>("textbox")
      expect(input.value).toBe("Miki")
    })

    it("writes user input to store", async () => {
      const { userStore } = renderCatFilters()
      userStore.nameSearchTerm = ""
      const input = screen.getByRole<HTMLInputElement>("textbox")

      await userEvent.type(input, "M")

      expect(userStore.nameSearchTerm).toBe("M")
    })

    it("displays adopted option", () => {
      renderCatFilters()

      const adoptedFlag = screen.getByText("Show adopted")
      expect(adoptedFlag).toBeInTheDocument()
    })
  })
})
