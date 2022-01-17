import React, { useState } from 'react';
import h from './Header.module.css';
import {NavLink} from 'react-router-dom';

const Header = (props) => {
    const [isShown, setIsShown] = useState(false);
    const toggleFIeldset = () => {
        setIsShown(!isShown);
    }

    return (
        <div>
            <ul className={h.menu}>
                {/*<li className={h.menu__item}><NavLink to="/">Главная</NavLink></li>*/}
                <li className={h.menu__item} onClick={toggleFIeldset}>
                    <NavLink to="/profile"
                             onClick={(e) => e.preventDefault()}>Профиль</NavLink>
                </li>
                {isShown &&
                <div className={`${h.menu__link_sub}`} onMouseLeave={toggleFIeldset}>
                    <li><NavLink to="/profile">Профиль</NavLink>
                        <ul id="is-reg" className={`${h.menu__submenu} ${h.submenu}`}>
                            <li className={h.menu__subitem}><NavLink to="/myLists" >Мои чек-листы</NavLink></li>
                            <li className={h.menu__subitem}><NavLink to="/myChallenges">Мои вызовы</NavLink></li>
                            <li className={h.menu__subitem}><NavLink to="/profile">Личные данные</NavLink></li>
                            <li className={h.menu__subitem}><NavLink to="/logout">Выйти</NavLink></li>
                        </ul>
                        {/*<ul id="non-reg" className="menu__submenu">*/}
                        {/*    <li><a to="#" className="menu__subitem">Войти</a></li>*/}
                        {/*</ul>*/}
                    </li>
                </div>
                }
            </ul>
        </div>
    );
}

export default Header;
