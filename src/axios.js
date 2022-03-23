import axios from 'axios'

// change var name to your api name
export const TypicodeCom = axios.create({
  baseURL: import.meta.env.VITE_APP_LINK_API,
  timeout: 2000,
  method: 'get',
})
