import axios from 'axios';
import getEnvVars from '../../config';

const { VIDEOTEK_API } = getEnvVars();

export default axios.create({
  baseURL: VIDEOTEK_API,
});
