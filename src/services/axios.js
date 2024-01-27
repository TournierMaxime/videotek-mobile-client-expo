import axios from 'axios'
import { EXPO_VIDEOTEK_API } from '@env'

axios.create({
  baseURL: EXPO_VIDEOTEK_API,
  withCredentials: true,
})

export default axios
