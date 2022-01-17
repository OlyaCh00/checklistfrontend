import list from './ModalCheckList.module.css';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import CheckListItemСontainer from '../CheckListItem/CheckListItemContainer';
import TextArea from '../TextArea/TextArea';
import {changeDescriptionActionCreator} from '../../../redux/todos-reducer';
import axios from 'axios';

const ModalCheckList = (props) => {
    const changeDescription = (value) => {
        props.dispatch(changeDescriptionActionCreator(props.task.id, value));
    }

    const closeModal = () => {
        props.setClose(false);
        if (props.isNewList) {
            const checklist = {
                tasks: [],
                title: props.task.description
            }
            props.task.goals.map(goal => {
                checklist.tasks.push({
                    title: goal.title,
                    goals: []
                })
            })
            axios.post("http://api.project.local/checklist", checklist,
                {headers: {Authorization : localStorage.token}})
                .then(res => {
                    if (!res.data) {
                        alert("Error");
                    }
                }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <div className={`${list.fixed}`}>
            <div className={list.modal}>
                <form action="">
                    <div className={`${list.modal__body} ${list.mbody} global-modal`}>
                        {/*<div className={`${list.checkList__head}`}>{props.task !== '' ? props.task.description : ''}</div>*/}
                        <div className={`${list.checkList__head}`}>
                            <TextArea value={props.task.description}
                                      placeholder={'Название'}
                                      changeText={changeDescription}
                                      isNewItem={false}/>
                        </div>
                        <div>
                            {props.task !== '' && props.task !== {} && props.task.goals.length !== 0 &&
                            props.task.goals.map(goal => {
                                return <CheckListItemСontainer goal={goal} key={goal.id} taskId={props.task.id}
                                                               goalId={goal.id} dispatch={props.dispatch} isModal={true} isDone={props.isDone}/>
                            })
                            }
                            { !props.isDone &&
                            <div className={list.addItem}>
                                <div className={`${list.addItem__item} ${list.item}`}>
                                    <span className={list.item__box}/>
                                    <span className={list.item__text}>
                                    <TextArea value={''}
                                              taskId={Number(props.task.id) + 1}
                                              goalId={Number(props.task.id) + 1}
                                              changeText={props.submitItem}
                                              isNewItem={true}
                                              placeholder={'Новый пункт'}/>
                                </span>
                                </div>
                            </div>
                            }
                        </div>
                        <div className={`${list.mbody__panel} ${list.panel}`}>
                            <div className={`${list.panel__left} ${list.left}`}>
                                {!props.isDone && !props.isNewList &&
                                <div className={`${list.left__challenge}`}
                                    onClick={() => {
                                        props.setClose(false);
                                        props.setOpenChallenge(true);
                                    }}/>
                                }
                                <div className={`${list.left__remove}`} onClick={() => props.removeTask(props.task.id)}/>
                                {/*{*/}
                                {/*    props.isNewList && <button className={list.left__save} onClick={() => props.setClose(false)}>создать чек-лист</button>*/}
                                {/*}*/}
                            </div>
                            <div className={list.panel__right} onClick={() => closeModal()}>закрыть</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>)
}

ModalCheckList.defaultProps = {taskId: 1}

export default ModalCheckList;
