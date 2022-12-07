

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const AllBuyer = () => {
    useTitle('allbuyer')

    const [deletingSeller, setDeletingSeller] = useState(null);
    const closeModal = () => {
        setDeletingSeller(null)
    }


    const { data: sellers = [] } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://fleja.vercel.app/position/buyer');
            const data = await res.json();
            return data;
        }

    })
    // console.log(users)


    return (
        <div>
            <h1 className='text-3xl'>All Buyers</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>



                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.length && sellers?.map((seller, i) => <tr key={seller._id}>
                                <td>{i + 1}</td>
                                <td>{seller.displayName}</td>
                                <td>{seller.email}</td>



                                <td></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {
                deletingSeller && <ConfirmationModal
                    title={`Are you sure you want to Delete?`}
                    message={`If you delete ${deletingSeller.name}.It can't be undone`}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllBuyer;