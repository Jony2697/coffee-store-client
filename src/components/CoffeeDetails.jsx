import React from 'react';
import { useLoaderData } from 'react-router';

const CoffeeDetails = () => {
    const initialCoffeeDetails = useLoaderData();
    const {name,details,supplier,taste,price,photo}=initialCoffeeDetails;
    // console.log(initialCoffeeDetails);

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm mt-10 mx-auto">
                <figure>
                    <img
                        src={photo}
                        alt="coffees picture" />
                </figure>
                <span className='border border-dashed border-gray-300'></span>
                <div className="card-body">
                    <h2 className="card-title">
                       {name}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{details}</p>
                    <div className="card-actions justify-center">
                        <div className="badge badge-outline">Price:{price}</div>
                        <div className="badge badge-outline">Taste:{taste}</div>
                        <div className="badge badge-outline">Supplier:{supplier}</div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeDetails;