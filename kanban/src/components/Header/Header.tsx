import React, { useState } from "react";
import { Link } from "react-router-dom";
import burger from './menu-btn.svg'
import './Header.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/user";
import { getAll } from "../../slices/cards";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    const handleBurgerClick = () => {
        setIsOpen(prev => !prev)
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(getAll([]))
    }

    return (
        <div className="header">
            <div className="header__wrapper">
                <div className="header__burger" onClick={handleBurgerClick}>
                    <img src={burger} alt='burger' />
                </div>
                <nav className={`header__menu ${isOpen && 'header__menu_opened'}`}>
                    <Link className="menu__kanban" to={'/'}>Kanban</Link>
                    {user.token
                        ?
                        <div className="profile">
                            <div className="profile__logout" onClick={handleLogout}>Выйти</div>
                        </div>
                        :
                        <div className="profile">
                            <Link to={'/login'}>Войти</Link>
                            <Link to={'/signup'}>Регистрация</Link>
                        </div>
                    }
                </nav>
            </div>
        </div>
    )
}

export default Header
