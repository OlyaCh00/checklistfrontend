import list from './ModalCheck.module.css';
import CheckListItem from '../../CheckList/CheckListItem/CheckListItem';
import ChallengeItem from '../ChallengeItem/ChallengeItem';
import TextArea from '../../CheckList/TextArea/TextArea';
import React, {useState} from 'react';
import {doneChlActionCreator} from '../../../redux/todos-reducer';

const ModalCheck = (props) => {

    const [file, setFile] = useState(null);
    const [isDone, setDone] = useState(false);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file);
    }

    const onFileUpload = (e) => {
        if (file) {
            const formData = new FormData();
            formData.append(
                "File",
                file,
                file.name
            );
            console.log(file);
            localStorage.setItem('file', file);
            //axios.post("api/uploadfile", formData);
            setDone(true);
            props.dispatch(doneChlActionCreator(props.task.id));
        } else {
            alert("Добавьте файл!")
        }
    }

    const downloadFile = (e) => {
        console.log(localStorage.getItem('file'))
    }

    const removeItem = () => {
        setFile(null);
        localStorage.removeItem('file');
    }

    return (
        <div className={`${list.modal__body} ${list.mbody} global-modal`}>
            {
                !props.isDone ? <div>
                    {isDone ?
                        <div className={`${list.checkList__head}`}>
                            Ожидание проверки
                        </div> :
                        <div className={`${list.checkList__head}`}>
                            Подтвердите выполнение вызова, приложив файл
                        </div>}
                    {isDone ?
                        <div className={`${list.checkList__done}`}>
                            Дождитесь проверки выполнения вашего вызова от другого участника.
                        </div> :
                        <div>
                            <div className={`${list.checkList__content} ${list.content}`}>
                                {file && <div className={`${list.content__file} ${list.file}`}>
                    <span className={`${list.file__name}`}
                          onClick={(e) => downloadFile(e)}>{file.name}</span>
                                    <span className={`${list.file__del}`} onClick={removeItem}/>
                                </div>}
                                <div className={`${list.content__list} ${list.list} `}>
                                    <input type="file" name="file" id="file" className={`${list.inputfile}`}
                                           onChange={(e) => onFileChange(e)}/>
                                    <label htmlFor="file" className={list.list__text}><span className={list.list__box}/>добавить файл</label>
                                </div>
                            </div>
                        </div>
                    }
                </div> :
                    <div>
                        <div className={`${list.checkList__head}`}>
                            Результаты выполнения вызова
                        </div>
                        <div className={`${list.list__head}`}>
                            Участник, который первым выполнил вызов:
                        </div>
                        <div className={`${list.list__img}`}/>
                        <div className={`${list.list__name}`}>
                            DOG
                        </div>
                    </div>
            }
            <div className={`${list.mbody__panel} ${list.panel}`}>
                <div className={`${list.panel__left} ${list.left}`}>
                    {
                        !isDone && !props.isDone &&  <div className={`${list.left__challenge}`}
                                         onClick={(e) => onFileUpload(e)}>отправить</div>
                    }
                </div>
                <div className={list.panel__right} onClick={() => props.setClose(false)}>закрыть</div>
            </div>
        </div>
    )
}

export default ModalCheck;
