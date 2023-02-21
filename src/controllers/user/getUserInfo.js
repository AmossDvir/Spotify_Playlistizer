import axios from "axios";
import { baseUrl } from "../../constants";

export const getUserInfo = async (token) => {
  try {
    const res = await axios.get(
      baseUrl + "users/me",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        },

      },
      { withCredentials: true }
    );
    return { success: true, data: res.data };
  } catch (err) {
    console.error(err);
    return { success: false, data: err };
  }
};
