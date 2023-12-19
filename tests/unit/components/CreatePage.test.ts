import { render, screen } from "@testing-library/vue"

import userEvent from "@testing-library/user-event"
import { createTestingPinia } from "@pinia/testing"

import { useUserStore } from "@/stores/user"
import { useCatsStore } from "@/stores/cats"

import CreatePage from "@/components/AdminPages/CreatePage.vue"

describe("CreatePage", () => {
  const renderCreatePage = (login: boolean) => {
    const pinia = createTestingPinia()

    const store = useUserStore()
    store.adminLoggedIn = login

    render(CreatePage, {
      global: {
        plugins: [pinia]
      }
    })
  }

  describe("checking the validations", () => {
    it("displays error message if name is empty", async () => {
      renderCreatePage(true)

      const inputName = screen.getByRole("textbox", {
        name: /name/i
      })
      await userEvent.clear(inputName)

      await userEvent.tab()

      const errorMessage = await screen.queryByText("Name is required")
      expect(errorMessage).toBeInTheDocument()
    })

    it("displays error message if name has any numbers", async () => {
      renderCreatePage(true)

      const inputName = screen.getByRole("textbox", {
        name: /name/i
      })
      await userEvent.type(inputName, "44")

      await userEvent.tab()

      const errorMessage = await screen.queryByText(
        "Name should not have numbers"
      )
      expect(errorMessage).toBeInTheDocument()
    })

    it("displays error message if age is a number greater than 13", async () => {
      renderCreatePage(true)

      const inputAge = screen.getByRole("spinbutton", {
        name: /age/i
      })
      await userEvent.type(inputAge, "40")

      await userEvent.tab()

      const errorMessage = await screen.findByText(
        "Age should be a less than 13"
      )
      expect(errorMessage).toBeInTheDocument()
    })

    it("displays error message if age is a negative number", async () => {
      renderCreatePage(true)

      const inputAge = screen.getByRole("spinbutton", {
        name: /age/i
      })
      await userEvent.type(inputAge, "-4")

      await userEvent.tab()

      const errorMessage = await screen.findByText(
        "Age should be a positive number"
      )
      expect(errorMessage).toBeInTheDocument()
    })

    it("displays error message if image is empty", async () => {
      renderCreatePage(true)

      const inputImage = screen.getByRole("textbox", {
        name: /image/i
      })
      await userEvent.clear(inputImage)

      await userEvent.tab()

      const errorMessage = await screen.queryByText("Image is required")
      expect(errorMessage).toBeInTheDocument()
    })
  })

  describe("if validatins are not met", () => {
    it("does not create a cat", async () => {
      renderCreatePage(true)

      const inputName = screen.getByRole("textbox", {
        name: /name/i
      })
      await userEvent.type(inputName, "44")

      const button = screen.getByRole("button", {
        name: /create cat/i
      })
      await userEvent.click(button)

      const catsStore = useCatsStore()

      expect(catsStore.ADD_CAT).not.toHaveBeenCalled()
    })
  })
})
