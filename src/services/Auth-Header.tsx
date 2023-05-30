export const AuthHeader = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if(user && user.accessToken){
        return { Authorization: `Bearer ${user.accessToken}` }; 
    }else{
        return {};
    }
}
