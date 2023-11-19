import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getUserInfo } from "./getUserInfo";

const useVerifyUser = () => {
  const [userVerified, setUserVerified] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);

  useEffect(() => {
    if (userVerified !== localStorage.getItem("access_token")) {
      if(localStorage.getItem("access_token")){
        const updateUserData = async () => {
          const accessToken = localStorage.getItem("access_token");
      
          if (accessToken && !userContext?.loggedIn) {
    
            const user = await getUserInfo(accessToken);
            setUserContext((oldValues) => {
              return {...oldValues, ...user.data, loggedIn: true} ;
            });
          }
          else if(!accessToken && userContext?.loggedIn){
            setUserContext((oldValues) => {
              return {} ;
            });
          }
        }
        updateUserData();
      }
      setUserVerified(
        localStorage.getItem("access_token") ? true : false
      );
    }
  });

  return userVerified;
};

export default useVerifyUser;
