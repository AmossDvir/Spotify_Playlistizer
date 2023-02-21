import axios from "axios";
import { baseUrl } from "../../constants";

export const login = async (userData) => {
    try{
        const res = await axios.post(baseUrl+"users/login",  {
            username: userData.username, password: userData.password
            }, {withCredentials:true});
        return {...res, refreshToken: document.cookie};
    }
    catch (err) {
        console.error(err);
        return {success: false, data: err};
    }
};