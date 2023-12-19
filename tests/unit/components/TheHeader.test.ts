import { render, screen } from "@testing-library/vue"

import { RouterLinkStub } from "@vue/test-utils"
import { createTestingPinia } from "@pinia/testing"

import { useUserStore } from "@/stores/user"

import TheHeader from "@/components/TheHeader.vue"

describe("TheHeader", () => {
  const renderTheHeader = (login: boolean) => {
    const pinia = createTestingPinia()

    const store = useUserStore()
    store.adminLoggedIn = login

    render(TheHeader, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  it("displays name of the page", () => {
    renderTheHeader(false)

    const pageName = screen.getByText("Meow Matchmakers")

    expect(pageName).toBeInTheDocument()
  })

  it("displays user profile picture", async () => {
    renderTheHeader(false)

    const profileImage = screen.queryByRole("img", {
      name: /user/i
    })
    expect(profileImage).toBeInTheDocument()
  })

  describe("when admin logs in", () => {
    it("displays admin profile picture", () => {
      renderTheHeader(true)

      const profileImage = screen.queryByRole("img", {
        name: /admin/i
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
