import axios from "axios"

import deleteCat from "@/api/deleteCat"

vi.mock("axios")

describe("deleteCat", () => {
  it("deletes cat with specific id", async () => {
    await deleteCat(1)
    expect(axios.delete).toHaveBeenCalled()
  })
})
