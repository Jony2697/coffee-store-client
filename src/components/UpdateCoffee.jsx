import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const coffee = useLoaderData();
    const { _id, name, quantity, price, taste, details, photo, supplier } = coffee;

    const handleUpdateCoffee = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedCoffee = Object.fromEntries(formData.entries());
        console.log(updatedCoffee);

        //send update coffee to the db

        fetch(`http://localhost:3000/coffees/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Coffee updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }


            })


    }
    return (
        <div>
            <div className='p-20'>
                <div className='p-10 text-center space-y-4'>
                    <h1 className='text-5xl'>Update coffee</h1>

                </div>
                <form onSubmit={handleUpdateCoffee}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Name</label>
                            <input type="text" name='name' defaultValue={name} className="input w-full" placeholder="Coffee Name" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Quantity</label>
                            <input type="text" name='quantity' defaultValue={quantity} className="input w-full" placeholder="Quantity" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Supplier</label>
                            <input type="text" name='supplier' defaultValue={supplier} className="input w-full" placeholder="Supplier Name" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Taste</label>
                            <input type="text" name='taste' defaultValue={taste} className="input w-full" placeholder="Taste Name" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Price</label>
                            <input type="text" name='price' defaultValue={price} className="input w-full" placeholder="Price" />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <label className="label">Details</label>
                            <input type="text" name='details' defaultValue={details} className="input w-full" placeholder="Details Name" />
                        </fieldset>
                    </div>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 my-6">
                        <label className="label">Photo</label>
                        <input type="text" name='photo' defaultValue={photo} className="input w-full" placeholder="Photo URL" />
                    </fieldset>

                    <input type="submit" className='btn w-full' value="Update Coffee" />
                </form>
            </div>
        </div>
    );
};

export default UpdateCoffee;