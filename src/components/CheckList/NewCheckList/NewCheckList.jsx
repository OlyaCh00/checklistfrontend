import list from './NewCheckList.module.css';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {changeStateActionCreator} from '../../../redux/todos-reducer';


const NewCheckList = (props) => {
    const [value, setValue] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        if (value.trim()) {
            props.onCreate(value);
        }
    }

    return (
        <div className={``}
             onClick={props.onStatusChange}>
            <form action="" onSubmit={submitHandler}>
                <input className={''} type="text" value={value} onChange={event => setValue(event.target.value)}/>
                <button type='submit'>Add</button>
            </form>
        </div>
    );
}

NewCheckList.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default NewCheckList;
