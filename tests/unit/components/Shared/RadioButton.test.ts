import { screen, render } from "@testing-library/vue"

import RadioButton from "@/components/Shared/RadioButton.vue"
import { createTestingPinia } from "@pinia/testing"

describe("RadioButton", () => {
  it("renders text with radio button", () => {
    const pinia = createTestingPinia()
    render(RadioButton, {
      props: {
        name: "SortBy",
        value: "Age",
        isChecked: true
      },
      global: {
        plugins: [pinia]
      }
    })

    const radio = screen.getByRole("radio", {
      name: /Age/i
    })

    expect(radio).toBeInTheDocument()
  })
})
