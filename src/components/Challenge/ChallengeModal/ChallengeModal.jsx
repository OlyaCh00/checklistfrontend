import list from './ChallengeModal.module.css';
import {NavLink} from 'react-router-dom';
import React, {useState} from 'react';
import CheckList from '../../CheckList/CheckList/CheckList';
import ModalNewChl from './ModalNewChl';
import ModalCheck from '../ModalChall/ModalCheck';


const ChallengeModal = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={list.listPage}>
            <div className={list.header}>
                <h2 className={list.header__name}>
                    Мои вызовы
                </h2>
                <div className={`${list.header__menu} ${list.menu}`}>
                    <div className={`${list.menu__nav} ${list.nav}`}>
                        <div className={list.nav__item}>
                            <NavLink to="/myChallenges">Текущие</NavLink>
                        </div>
                        <div className={list.nav__item}>
                            <NavLink to="/myChallengesDone">Выполненные</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className={list.emptyLists}>
                У вас еще нет вызовов. <br/><br/><br/>
                Зайдите на <NavLink to="/myLists" className={list.emptyLists__link}>страницу чек-листов</NavLink>, выберете чек-лист и нажмите кнопку “Бросить вызов”<br/>
            </div>
            {isOpen && <ModalNewChl task={props.task}
                setClose={(state) => setIsOpen(state)}/>}
        </div>
    );
}

export default ChallengeModal;
