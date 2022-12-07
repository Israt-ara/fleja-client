

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const AllSeller = () => {
    useTitle('allseller')

    const [deletingSeller, setDeletingSeller] = useState(null);
    const closeModal = () => {
        setDeletingSeller(null)
    }



    const handleDeleteSeller = user => {
        // console.log(user)
        fetch(`https://fleja.vercel.app/position/seller${user._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Seller ${user.name} deleted Successfully`)
                }

            })

    }







    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://fleja.vercel.app/position/seller');
            const data = await res.json();
            return data;
        }

    })
    // console.log(users)


    return (
        <div>
            <h1 className='text-3xl'>All Sellers</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.length && sellers?.map((seller, i) => <tr key={seller._id}>
                                <td>{i + 1}</td>
                                <td>{seller.displayName}</td>
                                <td>{seller.email}</td>
                                <td><button>Verify</button></td>
                                <td>
                                    <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-xs btn-danger">Delete</label>
                                </td>

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
                    successAction={handleDeleteSeller}
                    modalData={deletingSeller}

                ></ConfirmationModal>
            }

        </div>
    );
};

export default AllSeller;