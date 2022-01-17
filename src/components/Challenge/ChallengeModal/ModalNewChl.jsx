import list from './ModalNewChl.module.css';
import CheckListItem from '../../CheckList/CheckListItem/CheckListItem';
import ChallengeItem from '../ChallengeItem/ChallengeItem';
import TextArea from '../../CheckList/TextArea/TextArea';
import React, {useState} from 'react';
import {doneChlActionCreator} from '../../../redux/todos-reducer';
import ModalChl from '../ModalChall/ModalChl';
import ModalCheck from '../ModalChall/ModalCheck';

const ModalNewChl = (props) => {

    return (
        <div className={`${list.fixed}`}>
            <div className={list.modal}>
                <div id="select" className={`${list.select}`}>
                    Чек-лист <span className={`${list.list__head_name}`}>@cat</span>
                </div>
                <div className={`${list.modal__body} ${list.mbody} global-modal`}>
                    <div className={`${list.checkList__head}`}>
                        {props.task.description}
                    </div>
                    {props.task.goals.map(goal => {
                        return         <ChallengeItem onStatusChange={() => {}}
                                                      isChallenge={true}
                                                      goal={goal}
                                                      isModal={true}
                                                      isDone={true}
                                                      key={goal.id}/>
                    })}

                    <div className={`${list.mbody__panel} ${list.panel}`}>
                        <div className={`${list.panel__left} ${list.left}`}>
                            <div className={`${list.left__challenge}`}
                                 onClick={(e) => {}}>принять</div>
                            <div className={`${list.left__challenge}`}
                                 onClick={(e) => {}}>отказаться</div>
                        </div>
                        <div className={list.panel__right} onClick={() => props.setClose(false)}>закрыть</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNewChl;
