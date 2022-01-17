import textarea from './TextArea.module.css'
import {useState} from 'react';
import {changeGoalActionCreator, removeTaskActionCreator} from '../../../redux/todos-reducer';

const TextArea = (props) => {
    const [value, setValue] = useState(props.value);
    let rowCount = 1;
    let count = 0;

    const countRows = (value) => {
        for (let str of value) {
            count++;
            if (count === 37 || str === '\n') {
                rowCount++;
                count = 0;
            }
        }
    }
    countRows(value);

    const textAreaChange = (e, item) => {
        e.style.height = "auto";
        setValue(item);
        if (item !== '') {
            e.style.height = e.scrollHeight + 'px';
        }
    }

    function saveResult (e) {
        props.changeText(value);
        let newValue = value;
        if (props.isNewItem) {
            newValue = '';
            setValue(newValue);
            textAreaChange(e.target, '');
        }
    }

    return (
        <textarea
            className={textarea.textarea}
            onChange={e => textAreaChange(e.target, e.target.value)}
            onBlur={(e) => {
                saveResult(e);
                countRows('');
            }}
            onDragEnter={(e) => {
                saveResult(e);
                countRows('');
            }}
            value={value}
            rows={rowCount}
        placeholder={props.placeholder}/>
    );
}

TextArea.defultProps = {isNewItem: false, placeholder: 'Новый пункт'}

export default TextArea;
