import axios from "axios"

import type { Cat } from "@/api/types"

const putCat = async (newCat: Cat) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/cats`
  await axios.put<Cat>(url, newCat)
}

export default putCat
