import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import LoginForm from './LoginForm';


const Navbar = ({user, setUser, cart}) => {

    return (
        <>
            <div id='navbar'>
            <ul>
                {/* <h2>SHEDS & DIGNITY</h2> */}
               <li> <Link to="/" className="nav_buttons">Home</Link></li>
                <li><Link to="products" className= "nav_buttons">Products</Link></li>
                {/* <img className="logo" src="https://res.cloudinary.com/fsa2/image/upload/v1670045518/Site%20Images/Logo_for_Website_1_1_kses4h.png"/> */}
                {/* <LoginForm user={user} setUser={setUser}/> */}
               <li>{user && user.id == 1 ? 
                <Link to="admin" className= "nav_buttons">Admin</Link> : null}
                </li>
                <li>{user.id ? <Link className="nav_buttons" to="dashboard">My Account</Link> : null}</li>
                <li>{cart.items.length ?
                    <Link to="cart" className= "nav_buttons" id="cart_nav"><span className="material-symbols-outlined">
                    shopping_cart
                    </span>({cart.items.length})</Link>
                : null}
                </li> 
                
                </ul>
            </div>
        </>
    );
};

export default Navbar