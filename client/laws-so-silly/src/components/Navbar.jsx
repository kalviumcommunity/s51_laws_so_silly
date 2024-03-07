import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
    const getCookies = () => {
        const cookieObj = document.cookie.split("; ").reduce((acc, cookie) => {
            const [name, value] = cookie.split("=");
            acc[name] = value;
            return acc;
        }, {});
        return cookieObj;
    };

    const authorize = async() => {
        const res = await axios.get("https://laws-so-silly.onrender.com/logout")
            console.log(res)
            if (!getCookies().authToken) {
                return toast.error("You have not logged in ")
            }
            toast.success("logged out successfully")
    }
    return (
        <nav>
            <button
                onClick={authorize}
            >
                Logout
            </button>
            <Link to="/login">
                <button>login</button>
            </Link>
            <Link to="/create">
                <button>Add data </button>
            </Link>
            <Link to="/">
                <button>
                    Home
                </button>
            </Link>
        </nav>
    );
}

export default Navbar;
