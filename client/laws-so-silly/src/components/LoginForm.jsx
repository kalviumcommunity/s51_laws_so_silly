import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const url = "https://laws-so-silly.onrender.com/login";
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(url, data);
            console.log(res); 

            // Set the authtoken cookie
            document.cookie = `authToken=${res.data.authToken}`;

            toast.success("Logged in as  " + res.data.username);
        } catch (error) {
            document.cookie = 'authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
            console.log(error)
            toast.error("Error logging in, " + error.response.data.message);
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder='username'
                    {...register("username", {
                        required: "Username is required"
                    })}
                />
                {errors.username && <p>{errors.username.message}</p>}
                <input
                    type="password"
                    placeholder='password'
                    {...register("password", {
                        required: "Password is required"
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <button type='submit'>Submit</button>
            </form>
        </>
    );
};

export default LoginForm;