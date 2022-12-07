import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const imageHostKey = process.env.REACT_APP_imgbb_key
    const navigate = useNavigate()

    const { data: categories, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('https://fleja.vercel.app/productsCategory')
            const data = await res.json();
            return data;
        }
    })

    const handleAddProduct = data => {
        console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData)
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const items = {
                        name: data.name,
                        price: data.price,
                        location: data.location,
                        phone: data.phone,
                        category: data.category,
                        image: imgData.data.url,
                        condition: data.condition
                    }

                    // save product information to the database
                    fetch('https://fleja.vercel.app/items', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(items)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success(`${data.name} is added successfully`)
                            navigate('/dashboard/myproduct')
                        })
                }
            })


    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h2 className='text-4xl'>Add A Product</h2>

            <form onSubmit={handleSubmit(handleAddProduct)} >


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>

                    </label>
                    <input {...register("name", { required: "Name is required" })} type="text" placeholder="Write your Name" className="input input-bordered w-full max-w-xs" />
                    <input />
                    {errors.name && <p className='text-red-500' role="alert">{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Price</span>

                    </label>
                    <input {...register("price", { required: "Price required" })} type="text" placeholder="Write the price" className="input input-bordered w-full max-w-xs" />
                    <input />
                    {errors.price && <p className='text-red-500' role="alert">{errors.price?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Location</span>

                    </label>
                    <input {...register("location", { required: "location is required" })} type="text" placeholder="Write your location" className="input input-bordered w-full max-w-xs" />
                    <input />
                    {errors.location && <p className='text-red-500' role="alert">{errors.location?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Phone Number</span>

                    </label>
                    <input {...register("phone", { required: "phone is required" })} type="text" placeholder="Write your Phone Number" className="input input-bordered w-full max-w-xs" />
                    <input />
                    {errors.phone && <p className='text-red-500' role="alert">{errors.phone?.message}</p>}
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Select A Category</span>

                    </label>

                    <select
                        {...register('category')}
                        className="select input-bordered mb-5 w-full max-w-xs">

                        {
                            categories.map(categori =>
                                <option key={categori._id}
                                    value={categori.name}>{categori.category}</option>

                            )
                        }
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>

                    </label>
                    <input {...register("image", { required: "Photo is required" })} type="file" placeholder="Write your Name" className="input input-bordered w-full max-w-xs" />
                    <input />
                    {errors.image && <p className='text-red-500' role="alert">{errors.image?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Condition</span>

                    </label>
                    <input {...register("condition", { required: "condition is required" })} type="text" placeholder="Write your Phone condition" className="input input-bordered w-full max-w-xs" />
                    <input />
                    {errors.condition && <p className='text-red-500' role="alert">{errors.condition?.message}</p>}
                </div>
                <input type="submit" value='Add A Product' className='btn btn-accent w-full' />
                {/* {signUpError && <p className='text-red-800'>{signUpError}</p>} */}
            </form>
        </div>
    );
};

export default AddProduct;