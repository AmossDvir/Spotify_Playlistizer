import axios from "axios";
import { baseUrl } from "../../constants";

export const CreateUser = async (userData) => {
    try{
        const res = await axios.post(baseUrl+"users/create",  {
            headers: {
                'content-type':'application/json'
            },
            data: {...userData, userCredentials:'read, write', authCode:''}
            });
        return {success: true, data: res.data};
    }
    catch (err) {
        console.error(err);
        return {success: false, data: err};
    }
};