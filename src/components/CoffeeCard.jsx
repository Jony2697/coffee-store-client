import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
    const { _id, name, photo, price, quantity } = coffee;


    const handleDelete = (_id) => {
        console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                //Start delete coffee data
                fetch(`https://coffee-store-server-weld-three.vercel.app/coffees/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your coffee has been deleted.",
                                icon: "success"
                            });

                            //remove the coffee from the state
                            const remainingCoffees=coffees.filter(cof => cof._id !== _id);
                            setCoffees(remainingCoffees)
                        }
                        // console.log(data);



                    })



            }
        });

    }

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-sm">
                <figure>
                    <img
                        src={photo}
                        alt="Movie" />
                </figure>
                <div className="flex items-center justify-around w-full">
                    <div>
                        <h2 className="card-title">{name}</h2>
                        <p>Price:{price}</p>
                        <p>Quantity:{quantity}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="join join-vertical space-y-3">
                            <Link to={`/coffee/${_id}`}>
                            <button className="btn w-full join-item ">View</button>
                            </Link>
                            <Link to={`/updateCoffee/${_id}`}>
                            <button className="btn join-item w-full">Edit</button>
                            </Link>
                            <button onClick={() => handleDelete(_id)} className="btn join-item">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;