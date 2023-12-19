import axios from "axios"

import { createCat } from "../../utils/createCat"

import putCat from "@/api/putCat"

vi.mock("axios")

describe("putCat", () => {
  it("updates cat with given object", async () => {
    const cat = createCat()
    await putCat(cat)
    expect(axios.put).toHaveBeenCalled()
  })
})
