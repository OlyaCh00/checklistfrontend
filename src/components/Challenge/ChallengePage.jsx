import list from './ChallengePage.module.css';
import {NavLink} from 'react-router-dom';
import {useState} from 'react';
import CheckList from '../CheckList/CheckList/CheckList';


const ChallengePage = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChallenge, setIsChallenge] = useState(false);

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
            { props.tasks.length ?
                <div className={list.checkLists}>
                    { props.tasks.map((task, index) => {
                        if (task.description !== '') {
                            return (
                                <CheckList isChallenge={true} isDone={props.isDone} setOpenChallenge={(state) => setIsChallenge(state)} task={task} key={index} id={task.id} dispatch={props.dispatch}/>
                            );
                        }
                    })}
                </div> :
                <div className={list.emptyLists}>
                    У вас еще нет вызовов. <br/><br/><br/>
                    Зайдите на <NavLink to="/myLists" className={list.emptyLists__link}>страницу чек-листов</NavLink>, выберете чек-лист и нажмите кнопку “Бросить вызов”<br/>
                </div>
            }
        </div>
    );
}

export default ChallengePage;
