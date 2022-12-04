import axios from "axios";
import { baseUrl } from "../../constants";

/**
 * Sends a POST request to the server with the data of the user.
 * Format should be: firstName, lastName, userEmail, userName, userCredentials, userPassword, authCode (optional), userId (optional)
 * @param {*} userData: data of the user
 * @returns {success, data} where success tells whether the request was successful or not, data is the data of the response
 */
export const createUser = async (userData) => {
  try {
    const res = await axios.post(baseUrl + "users/create", {
      headers: {
        "content-type": "application/json",
      },
      data: {
        userName: userData.username,
        userPassword: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userEmail: userData.email,
        userCredentials: "read, write",
      },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.error(err?.message);
    return { success: false, data: err };
  }
};
