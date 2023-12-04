import axios from "axios"

import type { Cat } from "@/api/types"

const postCat = async (newCat: Cat) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/cats`
  await axios.post<Cat>(url, newCat)
}

export default postCat
