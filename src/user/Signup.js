import React, { useState } from 'react';
import Base from '../core/Base';
import {signup} from '../auth/helper/index';
import {Link} from "react-router-dom"; 

const Signup = () => {
    const [values, setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : "", 
        success: false,
    });

const {name, email, password, error, success} = values; //destructuring of object

// unfinished : need to handle multiple errors  
// send error codes from the backend and handle errors by matching with thoes error codes
const handleChange = (name) =>   //this is a higher order function
    (event) => {
        setValues({...values, error:false, [name]: event.target.value});
    };

const onSubmit = (event) => {
    console.log({name,email,password})
    event.preventDefault();
    setValues({...values, error:false});
    signup({name, email, password})
        .then(data => {
            //send a success or failure message from the backend instead
        console.log("DATA", data);   //will give the instance that we returned in backend
        if (data.email === email) {  //data.email is the email we will recieve from backend 
                                     //email is the email that we send from the front end
            setValues({
                ...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:true
            });
        }else{
            setValues({
                ...values,
                error:true,  //show actual error messages to the user
                success:false,
            });
        }
    })
        .catch(e => console.log(e));
};

const successMessage = () => {
    return (
        <div className="row">
            <div className ="col-md-6 offset-sm-3 text-left">
                <div 
                    className="alert alert-success"
                    style={{display: success?"":"none"}}
                >
                    New account created successfully. Please <Link to="/signin">login now.</Link>
                </div>
            </div>
        </div>
    )
}

const errorMessage = () => {
    return (
        <div className="row">
            <div className ="col-md-6 offset-sm-3 text-left">
                <div 
                    className="alert alert-danger"
                    style={{display: error?"":"none"}}
                >
                    Check all fields again
                </div>
            </div>
        </div>
    )
}

const signUpForm = () => {
    return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input 
                        className="form-control" 
                        value={name}
                        onChange={handleChange("name")} 
                        type="text"
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input 
                        className="form-control" 
                        value={email}
                        onChange={handleChange("email")} 
                        type="email"
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input 
                        className="form-control" 
                        value={password}
                        onChange={handleChange("password")} 
                        type="password"
                        />
                    </div>
                    <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>   
                    {/* no paranthesis on onSubmit because we don't want to run it directly we want to run it on an event */}
                    
                </form>
            </div>
        </div>
    );
};
    return (
        <Base title="Sign up please" description="signup page for e-tshirt store">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signup;