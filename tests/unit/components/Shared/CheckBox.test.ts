import { screen, render } from "@testing-library/vue"

import CheckBox from "@/components/Shared/CheckBox.vue"

import { createTestingPinia } from "@pinia/testing"

describe("CheckBox", () => {
  it("renders text with radio button", () => {
    const pinia = createTestingPinia()
    render(CheckBox, {
      props: {
        action: () => {},
        value: "Age",
        isChecked: true
      },
      global: {
        plugins: [pinia]
      }
    })

    const checkbox = screen.getByRole("checkbox", {
      name: /Age/i
    })

    expect(checkbox).toBeInTheDocument()
  })
})
