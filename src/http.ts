import axios from "axios"

export const createClient = (apiKey: string, baseUrl: string) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json"
    },
    timeout: 5000
  })
}
