import axios from "axios";
import { baseUrl } from "../constants";
export const spotifyServer = axios.create({
  withCredentials:true,
    baseURL: baseUrl+'spotify',
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
  
  spotifyServer.interceptors.response.use(undefined, error => {
    const statusCode = error.response ? error.response.status : null;
  
    if (statusCode === 401) {
      spotifyServer.post('/refresh', {}, {withCredentials:true})
    }
  
    return Promise.reject(error);
  });
   