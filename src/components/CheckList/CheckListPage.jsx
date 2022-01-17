import list from './CheckListPage.module.css';
import CheckList from './CheckList/CheckList';
import {NavLink} from 'react-router-dom';
import ModalCheckList from './ModalCheckList/ModalCheckList';
import {useEffect, useState} from 'react';
import {
    addItemActionCreator,
    addTaskActionCreator,
    removeTaskActionCreator,
    writeStateActionCreator
} from '../../redux/todos-reducer';
import ModalChallenge from './ModalChallenge/ModalChallenge';
import axios from 'axios';

const CheckListPage = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const countNewId = Math.ceil(Math.random() * (100 - 1) + 1);
    const [newId, setId] = useState(countNewId);

    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get('http://api.project.local/checklist',
            {headers: {Authorization : localStorage.token}})
            .then((res) => {
                console.log(res);
                setLists(res.data);
                props.dispatch(writeStateActionCreator(res.data));
        })
    });

    const addTask = () => {
        setId(countNewId);
        props.dispatch(addTaskActionCreator(countNewId));
        setIsOpen(true);
    }
    const addItem = (value) => {
        props.dispatch(addItemActionCreator(value, newId));
    }

    const removeTask = (id) => {
        props.dispatch(removeTaskActionCreator(id));
        setIsOpen(false);
    }

    return (
        <div className={list.listPage}>
                <div className={list.header}>
                    <h2 className={list.header__name}>
                        Мои чек-листы
                    </h2>
                    <div className={`${list.header__menu} ${list.menu}`}>
                        <div className={`${list.menu__nav} ${list.nav}`}>
                            <div className={list.nav__item}>
                                <NavLink to="/myLists">Текущие</NavLink>
                            </div>
                            <div className={list.nav__item}>
                                <NavLink to="/myListsDone">Выполненные</NavLink>
                            </div>
                        </div>
                        {
                            !props.isDone &&
                            <div className={`${list.menu__createBtn} ${list.createBtn}`}
                                onClick={() => {
                                    addTask();
                                }}>
                                <span className={list.createBtn__plus}/>
                                <span className={list.createBtn__text}>Создать чек-лист</span>
                            </div>
                        }
                    </div>
                </div>
                { props.tasks.length ?
                    <div className={list.checkLists}>
                        { props.tasks.map((task, index) => {
                            if (task.description !== '') {
                                return (
                                    <CheckList isDone={props.isDone} task={task} key={index} id={task.id} dispatch={props.dispatch}/>
                                );
                            }
                        })}
                    </div> :
                    <div className={list.emptyLists}>
                        У вас еще нет чек-листов. <br/><br/><br/>
                        
                        Нажмите на кнопку <span className={list.emptyLists__link} onClick={() => {}}>“Создать чек-лист”</span> на данной странице и составьте свой чек-лист.
                    </div>
                }
            {isOpen && <ModalCheckList
                setClose={(state) => setIsOpen(state)}
                removeTask={removeTask}
                submitItem={addItem}
                task={props.tasks.find(task => task.id === newId)}
                dispatch={props.dispatch}
                isNewList={true}
            />}
            {/*{*/}
            {/*    isChallenge && <ModalChallenge*/}
            {/*        setClose={(state) => setIsChallenge(state)}*/}
            {/*        taskId={props.task.id}*/}
            {/*        dispatch={props.dispatch}/>*/}
            {/*}*/}
        </div>
    );
}

export default CheckListPage;
