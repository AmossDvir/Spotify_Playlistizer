import axios from "axios";
import { baseUrl } from "../../constants";


export const login = async (userData) => {
    try{
        const res = await axios.post(baseUrl+"users/login",  {
            headers: {
                'content-type':'application/json'
            },
            data: {userName: userData.username, userPassword: userData.password}
            });
        return {success: true, data: res.data[0]};
    }
    catch (err) {
        console.error(err);
        return {success: false, data: err};
    }
};