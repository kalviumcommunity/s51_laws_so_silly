import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
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
