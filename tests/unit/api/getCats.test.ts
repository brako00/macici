import type { Mock } from "vitest"
import axios from "axios"

import getCats from "@/api/getCats"

vi.mock("axios")
const axiosGetMock = axios.get as Mock

describe("getCats", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Medo"
        }
      ]
    })
  })

  it("fetches cats that are for adoption", async () => {
    await getCats()
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/cats")
  })

  it("extracts cats from response", async () => {
    const cats = await getCats()
    expect(cats).toEqual([{ id: 1, name: "Medo" }])
  })
})
