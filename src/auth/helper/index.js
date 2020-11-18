import {API} from '../../backend';
import {cartEmpty} from '../../core/helper/cartHelper';

export const signup = (user) => {
    return fetch(`${API}user/`, {
        method : 'POST',
        headers : {
            Accept : "application/json",
            "content-type" : "application/json" 
        },
        body : JSON.stringify(user)
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
    const formData = new FormData();
    for(const name in user){
        formData.append(name, user[name]);
    }

    //Alternative 
    // const {email, password} = user;
    // const formData = new FormData;
    // formData.append('email', email)
    // formData.append('password', password)
    // for(var key of formData.keys()){
    //     console.log("My Key: ", key)
    // }

    return fetch(`${API}user/login/`,{
        method:"POST",
        body:formData    //JSON.stringify(user)
    })
    .then((response) => {
        console.log("SUCCESS", response);
        return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data,next) => {
    if(typeof window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if(typeof window == undefined){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
};

export const signout = (next) => {
     const userId = isAuthenticated() && isAuthenticated().user.id;
     if (typeof window !== undefined){
        localStorage.removeItem("jwt");
        cartEmpty(() => {}); 
        //next();
        
        return fetch(`${API}user/logout/${userId}`, {
            method : "GET"
        }) 
        .then(response => {
            console.log("Signout success");
            next();
        })
        .catch(err => {
            console.log(err);
        })
     }
}