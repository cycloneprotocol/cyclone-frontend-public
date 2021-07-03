import Axios from 'axios';
import Config from '../Config';

export const backendApi = Axios.create({
  baseURL: Config.backendServiceURL,
});
