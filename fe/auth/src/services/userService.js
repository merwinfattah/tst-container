import axios from 'axios'
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + 'register';

export function register(user) {
    return axios({
        method: 'post',
        url: apiEndpoint,
        data: {
          username: user.username,
          password: user.password
        }
      });
}



