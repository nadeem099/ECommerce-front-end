import React, { useState } from 'react';
import Base from '../core/Base';
import {signup} from '../auth/helper/index';

const Signup = () => {
    const [values, setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : "", 
        success: false,
    });

const {name, email, password, error, success} = values;

//unfinished : need to handle multiple errors  //send error codes from the backend and handle errors by matching with thoes error codes
const handleChange = (name) =>   //this is a higher order function
    (event) => {
        setValues({...values, error:false, [name]: event.target.values});
    };

const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error:false});
    signup({name, email, password})
        .then(data => {
        console.log("DATA", data);  
        if (data.email === email) {
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
                error:true,
                success:false,
            });
        }
    })
        .catch(e => console.log(e));
};

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
                        type="text"
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
                    
                </form>
            </div>
        </div>
    );
};
    return (
        <Base title="Sign up please" description="signup page for e-tshirt store">
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signup;