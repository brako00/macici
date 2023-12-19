import axios from "axios"

import { createCat } from "../../utils/createCat"

import postCat from "@/api/postCat"

vi.mock("axios")

describe("postCat", () => {
  it("creates cat with given object", async () => {
    const cat = createCat()
    await postCat(cat)
    expect(axios.post).toHaveBeenCalled()
  })
})
