import type { Cat } from "@/api/types"

export const createCat = (cat: Partial<Cat> = {}): Cat => ({
  id: 1,
  name: "Micko",
  color: "Yellow",
  age: 6,
  image: "",
  adopted: false,
  ...cat
})
