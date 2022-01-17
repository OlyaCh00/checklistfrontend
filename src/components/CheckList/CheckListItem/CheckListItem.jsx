import list from './CheckListItem.module.css';
import listModal from './CheckListItemModal.module.css';
import PropTypes from 'prop-types';
import React, {Component, useEffect, useState} from 'react';
import {changeStateActionCreator} from '../../../redux/todos-reducer';
import listOfClasses from './CheckListItem.module.css';
import TextArea from '../TextArea/TextArea';

const CheckListItem = (props) => {
    const listOfClasses = props.isModal ? listModal : list;
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
    if (props.goal.status === 'task_closed') {
        classesText.push(listOfClasses.item__text_done);
        classesBox.push(listOfClasses.item__box_done);
    }

    return (
        <div className={`${listOfClasses.checkList__string}`}>
                <div className={`${listOfClasses.checkList__item} ${listOfClasses.item}`} >
                    {/*<input className={listOfClasses.item__checkbox} type="checkbox"/>*/}
                    <span className={classesBox.join(' ')} onClick={props.onStatusChange}/>
                    {!props.isModal ? <span className={classesText.join(' ')} onClick={props.onStatusChange}>{value}</span> :
                        <span className={classesText.join(' ')}>
                            {props.isChallenge ? value : <TextArea value={value}
                                                                   taskId={props.taskId}
                                                                   goalId={props.goalId}
                                                                   changeText={props.changeItem}/>}

                        </span>
                    }
                </div>
            {
                !props.isDone &&  <div className={classesDel.join(' ')} onClick={props.removeItem}/>
            }
        </div>
    );
}

// CheckListItem.propTypes = {
//     goal: PropTypes.object.isRequired,
//     id: PropTypes.string,
//     changeState: PropTypes.func
// }

export default CheckListItem;



/*export default class CheckListItem extends Component {
    constructor(props) {
        super(props);
        this.value = props.goal.title;
        this.textRef = React.createRef();
        this.listOfClasses = props.isModal ? listModal : list;
        this.classesText = [this.listOfClasses.item__text];
        this.classesBox = [this.listOfClasses.item__box];
        this.classesDel = [this.listOfClasses.item__del];
        if (props.isModal) {
            this.classesText.push(this.listOfClasses.item__text_modal);
        }
    }

    componentDidMount() {
        if (this.textRef) {
            this.textAreaChange(this.textRef.current);
        }
    }

    state = {
        value: this.props.goal.title
    }

    textAreaChange(e) {
        if (e) {
            e.style.height = "auto";
            this.setState({value: e.value});
            this.props.goal.title = this.state.value;
            e.style.height = e.scrollHeight + 'px';
        }
    }

    onStatusChange() {
        this.props.onStatusChange();
        if (this.props.goal.status === 'goal_close') {
            this.classesText.push(this.listOfClasses.item__text_done);
            this.classesBox.push(this.listOfClasses.item__box_done);
        } else {
            this.classesText = this.classesText.filter(oneClass => oneClass !== this.listOfClasses.item__text_done);
            this.classesBox = this.classesBox.filter(oneClass => oneClass !== this.listOfClasses.item__box_done);
        }
    }

    render() {
        return(
            <div className={`${this.listOfClasses.checkList__string}`}>
                <div className={`${this.listOfClasses.checkList__item} ${this.listOfClasses.item}`} onClick={this.onStatusChange.bind(this)}>
                    <input className={this.listOfClasses.item__checkbox} type="checkbox"/>
                    <span className={this.classesBox.join(' ')}/>
                    {!this.props.isModal ? <span className={this.classesText.join(' ')}>{this.props.goal.title}</span> :
                        <textarea
                            className={this.classesText.join(' ')}
                            ref={this.textRef}
                            onChange={e => this.textAreaChange(e.target)}
                            value={this.state.value}/>
                    }
                </div>
                <div className={this.classesDel.join(' ')} onClick={this.props.removeItem}>
                </div>
            </div>
        );
    }
}*/
