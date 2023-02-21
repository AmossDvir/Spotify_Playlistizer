import axios from "axios";
import { baseUrl } from "../../constants";

export const logout = async (userData) => {
    try{
        const res = await axios.delete(baseUrl+"users/logout",  {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            username: userData.username, password: userData.password
            }, {withCredentials:true});
        return res;
    }
    catch (err) {
        console.error(err);
        return {success: false, data: err};
    }
};