import React, { useState } from "react";
import { Link } from "react-router-dom";
import burger from './menu-btn.svg'
import './Header.scss'

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const user = false // времменно

    const handleBurgerClick = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className="header">
            <div className="header__wrapper">
                <div className="header__burger" onClick={handleBurgerClick}>
                    <img src={burger} alt='burger' />
                </div>
                <nav className={`header__menu ${isOpen && 'header__menu_opened'}`}>
                    <Link to={'/'}>Kanban</Link>
                    {user
                        ?
                        <div className="profile">
                            <div className="profile__username">Username</div>
                            <div className="profile__logout">Выйти</div>
                        </div>
                        :
                        <div className="profile">
                            <Link to={'/login'}>Войти</Link>
                            <Link to={'/registration'}>Регистрация</Link>
                        </div>
                    }
                </nav>
            </div>
        </div>
    )
}

export default Header
