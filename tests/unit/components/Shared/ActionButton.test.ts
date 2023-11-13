import { render, screen } from "@testing-library/vue"

import ActionButton from "@/components/Shared/ActionButton.vue"

describe("ActionButton", () => {
  it("renders text inside button", () => {
    render(ActionButton, {
      props: {
        text: "Some text",
        type: "primary"
      }
    })

    const button = screen.getByRole("button", {
      name: /Some text/i
    })
    expect(button).toBeInTheDocument()
  })

  it("applies one of several styles to button", () => {
    render(ActionButton, {
      props: {
        text: "Click me",
        type: "primary"
      }
    })

    const button = screen.getByRole("button", {
      name: /click me/i
    })
    expect(button).toHaveClass("primary")
  })
})
