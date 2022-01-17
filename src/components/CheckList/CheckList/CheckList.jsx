import list from './CheckList.module.css';
import PropTypes from 'prop-types';
import CheckListItem from '../CheckListItem/CheckListItem';
import React, {useState} from 'react';
import CheckListItemСontainer from '../CheckListItem/CheckListItemContainer';
import {addItemActionCreator, removeTaskActionCreator} from '../../../redux/todos-reducer';
import ModalCheckList from '../ModalCheckList/ModalCheckList';
import ModalChallenge from '../ModalChallenge/ModalChallenge';
import ModalChall from '../../Challenge/ModalChall/ModalChall';

const CheckList = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const [isChallenge, setIsChallenge] = useState(false);

    const addItem = (value) => {
        props.dispatch(addItemActionCreator(value, props.task.id));
    }

    const removeTask = (id) => {
        props.dispatch(removeTaskActionCreator(id));
        setIsOpen(false);
    }

    return (
        <div className={list.checkList}>
            <div className={list.checkList__background}>
                <div className={list.checkList__head} onClick={() => setIsOpen(true)}>
                    {props.task.description}
                </div>
                {isOpen && !props.isChallenge && <ModalCheckList
                    isDone={props.isDone}
                    setClose={(state) => setIsOpen(state)}
                    removeTask={removeTask}
                    submitItem={addItem}
                    task={props.task}
                    dispatch={props.dispatch}
                    setOpenChallenge={(state) => setIsChallenge(state)}
                />}
                {isOpen && props.isChallenge && <ModalChall
                    isDone={props.isDone}
                    setClose={(state) => setIsOpen(state)}
                    removeTask={removeTask}
                    submitItem={addItem}
                    task={props.task}
                    dispatch={props.dispatch}
                    setOpenChallenge={(state) => setIsChallenge(state)}
                />}
                {
                    isChallenge && <ModalChallenge
                        setClose={(state) => setIsChallenge(state)}
                        taskId={props.task.id}
                        dispatch={props.dispatch}/>
                }
                {
                    props.task.goals.map(goal => {
                        return <CheckListItemСontainer goal={goal} key={goal.id} taskId={props.task.id}
                                                       goalId={goal.id} dispatch={props.dispatch} isModal={false}/>
                    })
                }
            </div>
        </div>
    );
}

// CheckList.propTypes = {
//     task: PropTypes.arrayOf(PropTypes.object).isRequired
// }

export default CheckList;
