import profile from './Profile.module.css';
import TextArea from '../CheckList/TextArea/TextArea';
import CheckListItemСontainer from '../CheckList/CheckListItem/CheckListItemContainer';
import {useState} from 'react';

const Profile = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={profile.listPage}>
            <h2 className={profile.header__name}>
                Профиль
            </h2>
            <div className={profile.content}>
                <div className={`${profile.content__panel} ${profile.panel}`}>
                    <form action="">
                        <div className={`${profile.panel__body} ${profile.body}`}>
                            <h3 className={`${profile.body__header}`}>Личные данные</h3>
                            <div className={`${profile.body__form} ${profile.form}`}>
                                <div className={`${profile.form__item} ${profile.item}`}>
                                    <label htmlFor="name" className={`${profile.item__label}`}>Имя</label>
                                    <input type="text" id={'name'}
                                           className={`${profile.item__input}`}
                                           placeholder={'Введите ваше имя'}/>
                                </div>
                                <div className={`${profile.form__item} ${profile.item}`}>
                                    <label htmlFor="email" className={`${profile.item__label}`}>E-mail</label>
                                    <input type="email" id={'email'}
                                           className={`${profile.item__input}`}
                                           placeholder={'Ваш e-mail'}/>
                                </div>
                                <div className={`${profile.form__btn}`} onClick={() => setIsOpen(!isOpen)}>Изменить пароль</div>
                                {
                                    isOpen &&
                                    <div className={`${profile.form__changePsw}`}>
                                        <div className={`${profile.form__item} ${profile.item}`}>
                                            <label htmlFor="old_password" className={`${profile.item__label}`}>Старый пароль</label>
                                            <input type="password" id={'old_password'}
                                                   className={`${profile.item__input}`}
                                                   placeholder={'Введите старый пароль'}/>
                                        </div>
                                        <div className={`${profile.form__item} ${profile.item}`}>
                                            <label htmlFor="new_password" className={`${profile.item__label}`}>Новый пароль</label>
                                            <input type="password" id={'new_password'}
                                                   className={`${profile.item__input}`}
                                                   placeholder={'Введите новый пароль'}/>
                                        </div>
                                        <div className={`${profile.form__item} ${profile.item}`}>
                                            <label htmlFor="new_password_check" className={`${profile.item__label}`}>Повторите пароль</label>
                                            <input type="password" id={'new_password_check'}
                                                   className={`${profile.item__input}`}
                                                   placeholder={'Повторитие новый пароль'}/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={`${profile.panel__menu} ${profile.menu}`}>
                            <div className={profile.menu__right} onClick={() => {}}>Сохранить</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
