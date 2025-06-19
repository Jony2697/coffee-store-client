import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const SignUp = () => {
    const { createUser } = use(AuthContext);
    console.log(createUser);

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password, ...restFormData } = Object.fromEntries(formData.entries());




        //create user in the firebase
        createUser(email, password)
            .then(result => {
                console.log(result.user);

                const userProfile = {
                    email,
                    ...restFormData,
                    creationTime:result.user?.metadata?.creationTime,
                    lastSignInTime:result.user?.metadata?.lastSignInTime

                }
                console.log(email, password, userProfile);


                //save userProfile in db
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your account is created",
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                        // console.log('after profile save',data);

                    })

            })
            .catch(error => {
                console.log(error);
            })



    }
    return (

        <div className="card bg-base-100 max-w-sm mx-auto shrink-0 shadow-2xl mt-20">
            <div className="card-body">
                <h1 className="text-5xl font-bold text-center">Sign Up now!</h1>
                <form onSubmit={handleSignUp} className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" className="input"
                        name='name' placeholder="Name" />
                    <label className="label">Address</label>
                    <input type="text" className="input"
                        name='address' placeholder="Address" />
                    <label className="label">Phone</label>
                    <input type="text" className="input"
                        name='phone' placeholder="Phone" />
                    <label className="label">Photo</label>
                    <input type="text" className="input"
                        name='photo' placeholder="Photo URL" />
                    <label className="label">Email</label>
                    <input type="email" className="input"
                        name='email' placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input" name='password' placeholder="Password" />
                    <div><a className="">You have an account? <Link className='link-hover' to={'/signIn'}>Login</Link> </a></div>
                    <button className="btn btn-neutral mt-4">Sign Up</button>
                </form>
            </div>
        </div>

    );
};

export default SignUp;