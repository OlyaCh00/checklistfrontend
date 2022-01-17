import list from './ModalChall.module.css';
import React, {useState} from 'react';
import {changeDescriptionActionCreator} from '../../../redux/todos-reducer';
import CheckListItem from '../../CheckList/CheckListItem/CheckListItem';
import ChallengeItem from '../ChallengeItem/ChallengeItem';
import ModalChl from './ModalChl';
import ModalCheck from './ModalCheck';

const ModalChall = (props) => {
    const [chl, setChl] = useState(true);
    const [check, setCheck] = useState(false);

    const [value, setValue] = useState(chl);

    const classModal = chl ? list.selectChl : list.selectCheck;

    const changeSelect = (event) => {
        console.log(event.target.value);
        if (event.target.value === "check") {
            setCheck(true);
            setChl(false);
        } else {
            setChl(true);
            setCheck(false);
        }
        setValue(event.target.value);
    }

    return (
        <div className={`${list.fixed}`}>
            <div className={list.modal}>
                {
                    props.isDone ?                 <select id="select" className={`${list.select} ${list.selectCheck}`}
                                                           value="check" onChange={(e) => changeSelect(e)}>
                        <option value="chl">Чек-лист</option>
                        <option value="check">Проверка выполнения вызова</option>
                    </select> :
                        <select id="select" className={`${list.select} ${classModal}`}
                                value={value} onChange={(e) => changeSelect(e)}>
                            <option value="chl">Чек-лист</option>
                            <option value="check">Проверка выполнения вызова</option>
                        </select>
                }

                {props.isDone && <ModalCheck task={props.task}
                                             setClose={props.setClose}
                                             dispatch={props.dispatch}
                                             isDone={props.isDone}/>}
                {
                    chl && !props.isDone && <ModalChl task={props.task}
                                     setClose={props.setClose}
                                     dispatch={props.dispatch}
                                     setCheck={setCheck}
                                     setChl={setChl}

                    />
                }
                {
                    check && !props.isDone && <ModalCheck task={props.task}
                                            setClose={props.setClose}
                                         dispatch={props.dispatch}/>
                }
            </div>
        </div>)
}

ModalChall.defaultProps = {taskId: 1}

export default ModalChall;
