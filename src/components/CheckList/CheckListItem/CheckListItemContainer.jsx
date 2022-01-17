import PropTypes from 'prop-types';
import React from 'react';
import {changeGoalActionCreator, changeStateActionCreator, removeItemActionCreator} from '../../../redux/todos-reducer';
import CheckListItem from './CheckListItem';
import axios from 'axios';


const CheckListItemСontainer = (props) => {
    const onStatusChange = () => {
        props.dispatch(changeStateActionCreator(props.taskId, props.goalId));
    }

    const removeItem = () =>
        props.dispatch(removeItemActionCreator(props.taskId, props.goalId));

    const changeItem = (value) => {
        axios.put("http://api.project.local/task/" + props.goalId, {title: value},
            {headers: {Authorization : localStorage.token}})
            .then(res => {
                if (!res.data) {
                    alert("Error");
                }
            }).catch((err) => {
            console.log(err);
        })
        //props.dispatch(changeGoalActionCreator(props.taskId, props.goalId, value));
    }

    return (
        <CheckListItem removeItem={removeItem}
                       onStatusChange={onStatusChange}
                       changeItem={changeItem}
                       goal={props.goal}
                       isModal={props.isModal}
                       isDone={props.isDone}/>
    );
}


export default CheckListItemСontainer;
