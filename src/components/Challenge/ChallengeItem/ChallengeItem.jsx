import list from './ChallengeItem.module.css';
import PropTypes from 'prop-types';
import React, {Component, useEffect, useState} from 'react';
import {changeStateActionCreator} from '../../../redux/todos-reducer';

const ChallengeItem = (props) => {
    const listOfClasses = list;
    const classesText = [listOfClasses.item__text];
    const classesBox = [listOfClasses.item__box];
    const classesDel = [listOfClasses.item__del];
    const [value, setValue] = useState(props.goal.title);

    useEffect(() => {
        setValue(props.goal.title);
    }, [props.goal.title]);

    if (props.isModal) {
        classesText.push(listOfClasses.item__text_modal);
    }
    if (props.goal.status === 'task_closed' && !props.isCopy) {
        classesText.push(listOfClasses.item__text_done);
        classesBox.push(listOfClasses.item__box_done);
    }

    return (
        <div className={`${listOfClasses.checkList__string}`}>
            <div className={`${listOfClasses.checkList__item} ${listOfClasses.item}`}
                 onClick={() => props.onStatusChange(props.goal.id)}>
                <span className={classesBox.join(' ')}/>
                {!props.isModal ? <span className={classesText.join(' ')}>{value}</span> :
                    <span className={classesText.join(' ')}>{value}</span>
                }
            </div>
        </div>
    );
}

export default ChallengeItem;
