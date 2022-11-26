import { AUTH_URL } from "./LoginController";


export const openSpotifyWindow = (userId) => {
    var win = window.open(AUTH_URL,'_blank', "location=yes,height=670,width=920,scrollbars=yes,status=yes");
    var loop = setInterval(function() {   
        if(win.closed) {  
            clearInterval(loop);  
            if (localStorage.getItem(userId + "spotifyAccessToken")){window.location.reload(true)};  
        }  
    }, 1000); 
}