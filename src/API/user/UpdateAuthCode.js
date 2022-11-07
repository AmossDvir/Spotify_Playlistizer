import axios from "axios";

const baseUrl = "http://localhost:3200/";
export const Login = async (userData) => {
    try{
        const res = await axios.post(baseUrl+"users/auth/code",  {
            headers: {
                'content-type':'application/json'
            },
            data: userData
            });
        return {success: true, data: res.data[0]};
    }
    catch (err) {
        console.error(err);
        return {success: false, data: err};
    }
};