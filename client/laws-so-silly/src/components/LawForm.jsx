import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify"
import "../App.css"
import 'react-toastify/dist/ReactToastify.css';

const Forms = ({ create = true, Country }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const api = "https://laws-so-silly.onrender.com/api/"
    const trimmer = (data) => {
        const arr = ["Country", "Law", "Penalty", "State_Region_if_applicable"]
        for (let key of arr)
            data[key] = data[key].trim()
        return data
    }
    const createData = async (data) => {
        try {
            data = trimmer(data)
            const response = await axios.post(api + "postData", data);
            console.log(response.data);
            toast.success("Addition successful")
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message)
        }
    };

    const updateData = async (data) => {
        try {
            data = trimmer(data)
            console.log(Country)
            const res = await axios.patch(api + `patchData/${Country}`, data)
            console.log(res.data)
            toast.success(`Updation of ${Country} successful`)
        }
        catch (err) {
            console.log(err.message)
            toast.error("Error while updating")
        }
    }

    return (
        <>
            <div>
                <ToastContainer />
                {create ? <h2>Add new data</h2> : <h2>Update {Country} data</h2>}
                <form onSubmit={handleSubmit(create ? createData : updateData)}>
                    <div>
                        <input
                            type="text"
                            placeholder='Country'
                            id="country"
                            {...register("Country", {
                                required: "Country Cannot be empty",
                                pattern: {
                                    value: /^[A-Z a-z]+/,
                                    message: "Country can only contain alphabets and should not contain empty spaces at the end"
                                }
                            })}
                        />
                        {errors.Country &&
                            <p className='error'>{errors.Country.message}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            id="law"
                            placeholder='Law'
                            {...register("Law", {
                                required: "Law cannot be empty",
                                pattern: {
                                    value: /^[A-z a-z]+/
                                }
                            })}
                        />
                        {errors.Law &&
                            <p className='error'>{errors.Law.message}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            id="penalty"
                            placeholder='Penalty'
                            {...register("Penalty", {
                                required: "Penalty cannot be empty"
                            })}
                        />
                        {errors.Penalty &&
                            <p className='error'>{errors.Penalty.message}</p>}
                    </div>
                    <div>
                        <input
                            placeholder='state or region'
                            type="text"
                            id="state"
                            {...register("State_Region_if_applicable", {
                                required: "State or region should not be empty"
                            })}
                        />
                        {errors.State_Region_if_applicable &&
                            <p className='error'>{errors.State_Region_if_applicable.message}</p>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

        </>
    )
}

export default Forms;