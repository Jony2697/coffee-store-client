import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const SignIn = () => {
    const { signInUser } = use(AuthContext);

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });

        //firebase sign in send
        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                const signInInfo = {
                    email,
                    lastSignInTime:result.user?.metadata?.lastSignInTime
                }
                //Update last sign in to the database
                fetch('http://localhost:3000/users',{
                    method:'PATCH',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(signInInfo)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log('after update patch',data);
                    
                })
            })
            .catch(error => {
                console.log(error);

            })





    }
    return (
        <div>
            <div className="card bg-base-100 max-w-sm mx-auto shrink-0 shadow-2xl mt-20">
                <div className="card-body">
                    <h1 className="text-5xl font-bold text-center">Log In now!</h1>
                    <form onSubmit={handleSignIn} className="fieldset">

                        <label className="label">Email</label>
                        <input type="email" className="input"
                            name='email' placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" className="input" name='password' placeholder="Password" />
                        <div>
                            <h2>Forget password</h2>
                        </div>
                        <button className="btn btn-neutral mt-4">Sign In</button>
                        <div><span className="">You don't have an account? <Link className='link-hover' to={'/signUp'}>Sign Up</Link> </span></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;