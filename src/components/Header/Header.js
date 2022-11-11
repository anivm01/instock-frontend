import './Header.scss'
import logo from "../../assets/InStock-Logo_2x.png";

import { Link, NavLink } from "react-router-dom"


const Header = () => {
    return (
        <header className='header'>
            <div className="header__container">
            <Link to="/" className='header__link'>
                <img className='header__logo' src={logo} alt='instock logo' />
            </Link>
            <nav className='header__nav'>
                <NavLink to="/warehouses" className="header__link-nav">
                    Warehouses
                </NavLink>

                <NavLink to="/inventory" className="header__link-nav">
                    Inventory
                </NavLink>
            </nav>
            </div>
        </header>
    )
}

export default Header