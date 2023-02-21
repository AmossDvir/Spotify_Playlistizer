import { useState, useEffect } from "react";

const useVerifyUser = () => {
  const [userVerified, setUserVerified] = useState(false);

  useEffect(() => {
    if (userVerified !== localStorage.getItem("access_token")) {
      setUserVerified(
        localStorage.getItem("access_token") ? true : false
      );
    }
  });

  return userVerified;
};

export default useVerifyUser;
