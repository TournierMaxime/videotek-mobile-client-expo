import axios from 'axios';
// import { VIDEOTEK_API } from '@env';

export default axios.create({
  baseURL: 'http://localhost:3610/api/v1/',
});
