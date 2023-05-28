import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import ShoppingCart from '../ShoppingCart';

const Navbar = () => {
    const context = useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-uffset-4';

    // Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut
    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        localStorage.setItem('sign-out', JSON.stringify(true));
        context.setSignOut(true);
    }

    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className="text-black/60">
                        {parsedAccount?.email}
                    </li>
                    <li>
                        <NavLink 
                            to='/my-orders'
                            className={ ({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            My Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/my-account'
                            className={ ({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/sign-in'
                            onClick={() => handleSignOut()}
                            className={ ({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            Sign Out
                        </NavLink>
                    </li>
                    <li className='flex items-center'>
                        <ShoppingCart />
                    </li>
                </>
            ) 
        } else {
            return (
                <li>
                    <NavLink 
                        to='/sign-in'
                        onClick={() => handleSignOut()}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Sign In
                    </NavLink>
                </li>
            )
        }
    }

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
            <ul className="flex items-center gap-4">
                <li className="font-semibold text-lg">
                    <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/'
                        onClick={() => context.setSearchByCategory()}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/mens-clothing'
                        onClick={() => context.setSearchByCategory("men's clothing")}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Men's clothing
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/womens-clothing'
                        onClick={() => context.setSearchByCategory("women's clothing")}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Women's clothing
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/electronics'
                        onClick={() => context.setSearchByCategory("electronics")}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/jewelery'
                        onClick={() => context.setSearchByCategory("jewelery")}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Jewelery
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-3">
                {renderView()}
            </ul>
        </nav>
    )
}

export default Navbar;