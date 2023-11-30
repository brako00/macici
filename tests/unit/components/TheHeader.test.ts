import { render, screen } from "@testing-library/vue"

import TheHeader from "@/components/TheHeader.vue"

describe("TheHeader", () => {
  it("displays name of the page", () => {
    render(TheHeader)

    const pageName = screen.getByText("Meow Matchmakers")

    expect(pageName).toBeInTheDocument()
  })
})
