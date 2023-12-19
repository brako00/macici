import { render, screen } from "@testing-library/vue"
import { createTestingPinia } from "@pinia/testing"

import CatCard from "@/components/CatListings/CatCard.vue"

import { useUserStore } from "@/stores/user"
import type { Cat } from "@/api/types"

import { createCat } from "../../../utils/createCat"
import { RouterLinkStub } from "@vue/test-utils"

describe("CatCard", () => {
  const renderCatCard = (cat: Cat, login: boolean) => {
    const pinia = createTestingPinia()

    const store = useUserStore()
    store.adminLoggedIn = login

    render(CatCard, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          "router-link": RouterLinkStub
        }
      },
      props: {
        cat: {
          ...cat
        }
      }
    })
  }

  it("displays cat name", () => {
    const catProps = createCat({ name: "Zeus" })
    renderCatCard(catProps, false)

    const catName = screen.getByText("Zeus")
    expect(catName).toBeInTheDocument()
  })

  it("displays adopt button", () => {
    const catProps = createCat({ name: "Zeus" })
    renderCatCard(catProps, false)

    const button = screen.getByRole("button", {
      name: /adopt/i
    })

    expect(button).toBeInTheDocument()
  })

  describe("when the admin logs in", () => {
    it("displays edit button", () => {
      const catProps = createCat({ name: "Zeus" })
      renderCatCard(catProps, true)

      const button = screen.getByRole("button", {
        name: /edit/i
      })

      expect(button).toBeInTheDocument()
    })
  })
})
