import list from './ModalChl.module.css';
import CheckListItem from '../../CheckList/CheckListItem/CheckListItem';
import ChallengeItem from '../ChallengeItem/ChallengeItem';
import {changeStateActionCreator, changeStateChlActionCreator} from '../../../redux/todos-reducer';

const ModalChl = (props) => {
    const onStatusChange = (id) => {
        props.dispatch(changeStateChlActionCreator(props.task.id, id));
    }

    const goalCopy = [];
    if (props.task) {
        props.task.goals.map(goal => {
            goalCopy.push({
                id: goal.id,
                title: goal.title,
                status: goal.status
            })
            return goal;
        })
    }

    const doneChl = () => {
        let done = true;
        props.task.goals.map(goal => {
            if (goal.status === 'task_open')
                done = false;
        });
        if (done) {
            props.setCheck(true);
            props.setChl(false);
        } else {
            alert('Вы не можете завершить невыполненный чек-лист!')
        }
    }

    return (
        <div className={`${list.modal__body} ${list.mbody} global-modal`}>
            {/*<div className={`${list.checkList__head}`}>{props.task !== '' ? props.task.description : ''}</div>*/}
            <div className={`${list.checkList__head}`}>
                {props.task.description}
            </div>
            <div className={`${list.checkList__content} ${list.content}`}>
                <div className={`${list.content__list} ${list.list} ${list.content__left}`}>
                    <div className={`${list.list__head}`}>
                        Мой чек-лист
                    </div>
                    <div className={`${list.list__items}`}>
                        {props.task.goals.map(goal => {
                            return         <ChallengeItem onStatusChange={onStatusChange}
                                                          isChallenge={true}
                                                          goal={goal}
                                                          isModal={true}
                                                          isDone={true}
                                                          key={goal.id}/>
                        })}
                    </div>
                </div>
                <div className={`${list.content__list} ${list.list}`}>
                    <div className={`${list.list__head}`}>
                        Чек-лист <span className={`${list.list__head_name}`}>@cat</span>
                    </div>
                    <div className={`${list.list__items} ${list.list__items_right}`}>
                        {goalCopy.map(goal => {
                            return         <ChallengeItem
                                                         isChallenge={true}
                                                          goal={goal}
                                                          isModal={true}
                                                          isCopy={true}
                                                          isDone={true}
                                                          key={goal.id}/>
                        })}
                    </div>
                </div>
            </div>
            <div className={`${list.mbody__panel} ${list.panel}`}>
                <div className={`${list.panel__left} ${list.left}`}>
                    <div className={`${list.left__challenge}`}
                         onClick={() => {}}>отказаться</div>
                    <div className={`${list.left__remove}`} onClick={() => doneChl()}>завершить</div>
                    {/*{*/}
                    {/*    props.isNewList && <button className={list.left__save} onClick={() => props.setClose(false)}>создать чек-лист</button>*/}
                    {/*}*/}
                </div>
                <div className={list.panel__right} onClick={() => props.setClose(false)}>закрыть</div>
            </div>
        </div>
    )
}

export default ModalChl;
