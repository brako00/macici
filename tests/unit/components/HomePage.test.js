import { render, screen } from "@testing-library/vue"

import HomePage from "@/components/HomePage.vue"

describe("HomePage", () => {
  it("displays text", () => {
    render(HomePage)

    //HTML dom output
    screen.debug()

    screen.getByText("home page")
  })
})
