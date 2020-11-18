import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';
import Base from '../core/Base';

const Signin = () => {
    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false,
        loading:false,
        didRedirect:false
    })

    const {name, email, password, error, success, loading, didRedirect} = values; //destructuring of object

    const handleChange = (name) =>   //this is a higher order function
    (event) => {
        setValues({...values, error:false, [name]: event.target.value});
    };

    //users local storage token matching with the servers token? success
    const onSubmit = (event) => {
        //console.log({email,password})
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        signin({email, password})
            .then(data => {
            console.log("DATA", data);   
            if (data.token){
                let sessionToken = data.token;
                authenticate(sessionToken, () => {
                    console.log("TOKEN ADDED");
                });
            }})
            .catch(e => console.log(e));
    };

    // const successMessage = () => {
    //     return (
    //         <div className="row">
    //             <div className ="col-md-6 offset-sm-3 text-left">
    //                 <div 
    //                     className="alert alert-success"
    //                     style={{display: success?"":"none"}}
    //                 >
    //                     Login success
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    // const errorMessage = () => {
    //     return (
    //         <div className="row">
    //             <div className ="col-md-6 offset-sm-3 text-left">
    //                 <div 
    //                     className="alert alert-danger"
    //                     style={{display: error?"":"none"}}
    //                 >
    //                     Check all fields again
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    
    
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
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
        <Base title="Welcome to Signin page" description="A t-shirt store">
            <h1 className="text-center">Welcome to signin page.</h1>
            {/* {successMessage()}
            {errorMessage()} */}
            {signUpForm()}
    <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};
export default Signin;