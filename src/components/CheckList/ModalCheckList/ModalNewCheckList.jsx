import list from './ModalCheckList.module.css';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import CheckListItemСontainer from '../CheckListItem/CheckListItemContainer';
import TextArea from '../TextArea/TextArea';
import {changeDescriptionActionCreator} from '../../../redux/todos-reducer';
import CheckListItem from '../CheckListItem/CheckListItem';

const ModalNewCheckList = (props) => {
    const task = {
        description: '',
        goals: []
    }

    const changeDescription = (value) => {
        task.description = value;
    }

    const addItem = (item) => {
        task.goals.push({title: item});
        console.log(task);
    }

    const removeItem = (item) => {
        task.goals.map((goal, index) => {
            if (goal.title === item) {
                task.goals.splice(index, 1);
            }
            return goal;
        })
    }

    const onStatusChange = () => {

    }

    const changeItem = (value) => {
        task.goals.map((goal) => {
            if (goal.title === value.slice(0, value.length - 2)) {
                goal.title = value;
            }
            return goal;
        })
    }

    return (
        <div className={`${list.fixed}`}>
            <div className={list.modal}>
                <form action="">
                    <div className={`${list.modal__body} ${list.mbody} global-modal`}>
                        <div className={`${list.checkList__head}`}>
                            <TextArea value={task.description}
                                      placeholder={'Название'}
                                      changeText={changeDescription}
                                      isNewItem={false}/>
                        </div>
                        <div>
                            {task.goals.length !== 0 &&
                            task.goals.map(goal => {
                                return         <CheckListItem removeItem={() => removeItem(goal.title)}
                                                              onStatusChange={onStatusChange}
                                                              changeItem={changeItem}
                                                              goal={goal}
                                                              isModal={props.isModal}/>
                            })
                            }
                            <div className={list.addItem}>
                                <div className={`${list.addItem__item} ${list.item}`}>
                                    <span className={list.item__box}/>
                                    <span className={list.item__text}>
                                    <TextArea value={''}
                                              changeText={addItem}
                                              isNewItem={true}
                                              placeholder={'Новый пункт'}/>
                                </span>
                                </div>
                            </div>
                        </div>
                        <div className={`${list.mbody__panel} ${list.panel}`}>
                            <div className={`${list.panel__left} ${list.left}`}>
                            </div>
                            <div className={list.panel__right} onClick={() => props.setClose(false)}>закрыть</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>)
}

ModalNewCheckList.defaultProps = {taskId: 1}

export default ModalNewCheckList;
