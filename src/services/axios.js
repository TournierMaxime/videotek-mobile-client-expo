import axios from 'axios';
import { EXPO_VIDEOTEK_API } from '@env'

export default axios.create({
  baseURL: EXPO_VIDEOTEK_API,
  withCredentials: true,
});
