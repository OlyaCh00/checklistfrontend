import list from './ModalChallenge.module.css';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import CheckListItemСontainer from '../CheckListItem/CheckListItemContainer';
import TextArea from '../TextArea/TextArea';
import {changeDescriptionActionCreator, createChlActionCreator} from '../../../redux/todos-reducer';

const ModalChallenge = (props) => {
    const [isLink, setIsLink] = useState(false);
    let classPanel = list.panel;
    if (isLink) classPanel = list.panelOne;

    return (
        <div className={`${list.fixed}`}>
            <div className={list.modal}>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <div className={`${list.modal__body} ${list.mbody}`}>
                        {
                            !isLink ?
                                <div>
                                    <div className={`${list.mbody__head}`}>
                                        Выберите способ подтверждения выполнения вызова
                                    </div>
                                    <div className={`${list.mbody__methods} ${list.methods}`}>
                                        <div className={`${list.methods__item}`}>
                                            <input type="radio" name="method" id="method1"/>
                                            <label htmlFor="method1">Прикрепление файла</label>
                                        </div>
                                        <div className={`${list.methods__item}`}>
                                            <input type="radio" name="method" id="method2"/>
                                            <label htmlFor="method2">Без проверки</label>
                                        </div>
                                    </div>
                                </div> :
                                <div>
                                    <div className={`${list.mbody__head}`}>
                                        Скопируйте ссылку и отправьте ее другому участнику
                                    </div>
                                    <div className={`${list.mbody__link}`}>
                                        Ссылка
                                    </div>
                                    <div className={`${list.mbody__text}`}>
                                        После того, как вы отправили ссылку, дождитесь согласия от другого участника.
                                    </div>
                                </div>
                        }

                        <div className={`${list.mbody__panel} ${classPanel}`}>
                            {!isLink &&
                            <div className={`${list.panel__left} ${list.left}`}>
                                <div className={`${list.left__remove}`} onClick={() => setIsLink(true)}>
                                    <button>далее</button>
                                </div>
                            </div>}
                            <div className={list.panel__right} onClick={() => {
                                props.setClose(false);
                                props.dispatch(createChlActionCreator(props.taskId));
                            }}>закрыть</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>)
}

export default ModalChallenge;
