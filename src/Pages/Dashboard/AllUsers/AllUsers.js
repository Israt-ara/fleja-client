import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const AllUsers = () => {
    useTitle('allUsers')

    const [deletingUser, setDeletingUser] = useState(null);
    const closeModal = () => {
        setDeletingUser(null)
    }
    const handleDeleteUser = user => {
        // console.log(user)
        fetch(`https://fleja.vercel.app/users/${user._id}`, {
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
                    toast.success(`User ${user.name} deleted Successfully`)
                }

            })

    }


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://fleja.vercel.app/users');
            const data = await res.json();
            return data;
        }

    })
    // console.log(users)

    const handleMakeAdmin = id => {
        fetch(`https://fleja.vercel.app/users/admin/${id}`,
            {
                method: 'PUT',
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                // }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Make Admin Successfully')
                    refetch()
                }
            })
    }

    return (
        <div>
            <h1 className='text-3xl'>All Users</h1>

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
                            users.length && users?.map((user, i) => <tr key={user._id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td> {user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                                <td>
                                    <label onClick={() => setDeletingUser(user)} htmlFor="confirmation-modal" className="btn btn-xs btn-danger">Delete</label>
                                </td>

                                <td></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {
                deletingUser && <ConfirmationModal
                    title={`Are you sure you want to Delete?`}
                    message={`If you delete ${deletingUser.name}.It can't be undone`}
                    closeModal={closeModal}
                    successAction={handleDeleteUser}
                    modalData={deletingUser}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllUsers;