import './Auth_Reg.module.css';
import reg from './Auth_Reg.module.css';
import {NavLink} from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import {useState} from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPsw] = useState("");
    const [hidden, setHidden] = useState(true);

    const submitChackin = event => {
        event.preventDefault();
        if(!validator.isEmail(email)) {
            alert("Неверный e-mail")
        } else {
            const user = {
                email: email,
                password: password
            }
            axios.post("http://api.project.local/user/login", user)
                .then(res => {
                    if (res.data) {
                        localStorage.setItem('token', res.data);
                        window.location.href = "http://localhost:3000/"
                    } else {
                        alert("Вход не удался, проверьте правильность введенных данных")
                    }
                }).catch(() => {
                alert("An error occurred on the server")
            })
        }
    }
    return (
        <div className="container-center">
            <form action="" className={`${reg.container__form} ${reg.form}`} onSubmit={submitChackin}>
                <div className={`${reg.form__fields} ${reg.fields}`}>
                    <input type="email" tabIndex="1" placeholder="E-MAIL" className={reg.fields__field}
                           value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <div className={reg.field}>
                        <input type={hidden ? 'password' : 'text'} tabIndex="2" placeholder="Пароль"
                               className={reg.fields__field}
                               value={password}
                               onChange={e => setPsw(e.target.value)}/>
                        <span className={reg.fields__eye} onClick={() => setHidden(!hidden)}/>
                    </div>
                </div>
                <button type="submit" tabIndex="3" className={`${reg.form__btn} ${reg.form__btn_enter}`}>Вход</button>
            </form>
            <div className={`${reg.container__subtitle} ${reg.container__subtitle_auth}`}>
                Или <NavLink to="/register" className={reg.container__link}>зарегистрируйтесь</NavLink>
            </div>
        </div>
    );
}

export default Auth;
