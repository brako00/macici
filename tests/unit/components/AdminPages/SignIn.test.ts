import { render, screen } from "@testing-library/vue"

import userEvent from "@testing-library/user-event"
import { createTestingPinia } from "@pinia/testing"

import { useUserStore } from "@/stores/user"

import SignIn from "@/components/AdminPages/SignIn.vue"

describe("SignIn", () => {
  const renderSignIn = () => {
    const pinia = createTestingPinia()

    render(SignIn, {
      global: {
        plugins: [pinia]
      }
    })
  }

  describe("checking the validations", () => {
    it("displays error message if name is empty", async () => {
      renderSignIn()

      const inputPassword = screen.getByPlaceholderText("Pass1234")
      await userEvent.clear(inputPassword)

      await userEvent.tab()

      const errorMessage = await screen.queryByText(
        "Password should have at least 8 characters"
      )
      expect(errorMessage).toBeInTheDocument()
    })

    it("displays error message if name has less than 8 characters", async () => {
      renderSignIn()

      const inputPassword = screen.getByPlaceholderText("Pass1234")
      await userEvent.type(inputPassword, "text")

      await userEvent.tab()

      const errorMessage = await screen.queryByText(
        "Password should have at least 8 characters"
      )
      expect(errorMessage).toBeInTheDocument()
    })

    it("displays error message if name does not have any numbers", async () => {
      renderSignIn()

      const inputPassword = screen.getByPlaceholderText("Pass1234")
      await userEvent.type(inputPassword, "Password")

      await userEvent.tab()

      const errorMessage = await screen.queryByText(
        "Password should have at least one number"
      )
      expect(errorMessage).toBeInTheDocument()
    })
  })
  describe("if all input requirements are met", () => {
    it("displays error message if username or password are incorrect", async () => {
      renderSignIn()

      const inputPassword = screen.getByPlaceholderText("Pass1234")
      await userEvent.type(inputPassword, "Password123")

      const button = screen.getByRole("button", {
        name: /sign in/i
      })
      await userEvent.click(button)

      const errorMessage = await screen.queryByText(
        "Username or password incorrect"
      )
      expect(errorMessage).toBeInTheDocument()
    })

    it("logs in admin if username and password are correct", async () => {
      renderSignIn()

      const inputUsername = screen.getByPlaceholderText("Admin")
      await userEvent.type(inputUsername, "Admin")

      const inputPassword = screen.getByPlaceholderText("Pass1234")
      await userEvent.type(inputPassword, "Pass1234")

      const button = screen.getByRole("button", {
        name: /sign in/i
      })
      await userEvent.click(button)

      const userStore = useUserStore()

      expect(userStore.adminLoggedIn).toBe(true)
    })
  })
})
