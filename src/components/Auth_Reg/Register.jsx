import reg from './Auth_Reg.module.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import {useState} from 'react';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPsw] = useState("");
    const [password2, setPsw2] = useState("");
    const [hidden, setHidden] = useState(true);
    const [hidden2, setHidden2] = useState(true);

    const submitChackin = event => {
        event.preventDefault();
        if(!validator.isEmail(email)) {
            alert("You did not enter email")
        } else if(password !== password2) {
            alert("Repeated password incorrectly")
        } else if(!validator.isStrongPassword(password, {minSymbols: 0})) {
            alert("Пароль должен содержать одну заглавную и прописную букву, цифру и спецсимвол")
        } else {
            const user = {
                name: name,
                email: email,
                password: password
            }
            axios.post("http://api.project.local/user/register", user)
                .then(res => {
                if (res.data) {
                    window.location.href = "http://localhost:3000/auth"
                } else {
                    alert("There is already a user with this email")
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
                        <input type="text" tabIndex="1" placeholder="Имя" className={reg.fields__field}
                               value={name}
                               onChange={e => setName(e.target.value)}/>
                        <input type="email" tabIndex="2" placeholder="E-MAIL" className={reg.fields__field}
                               value={email}
                               onChange={e => setEmail(e.target.value)}/>
                        <div className={reg.field}>
                            <input type={hidden ? 'password' : 'text'} tabIndex="3" placeholder="Пароль" className={reg.fields__field}
                                   value={password}
                                   onChange={e => setPsw(e.target.value)}/>
                            <span className={reg.fields__eye}
                                  onClick={() => setHidden(!hidden)}/>
                        </div>
                        <div className={reg.field}>
                            <input type={hidden2 ? 'password' : 'text'} tabIndex="4" placeholder="Повторите пароль" className={reg.fields__field}
                                   value={password2}
                                   onChange={e => setPsw2(e.target.value)}/>
                            <span className={reg.fields__eye} onClick={() => setHidden2(!hidden2)}/>
                        </div>
                    </div>
                    <button type="submit" tabIndex="5" className={`${reg.form__btn} ${reg.form__btn_reg}`}>Зарегистрироваться</button>
                </form>
                <div className={`${reg.container__subtitle} ${reg.container__subtitle_reg}`}>
                    Уже зарегистрированы? <NavLink to="/auth" className={reg.container__link}>войти</NavLink>
                </div>
        </div>
    );
}

export default Register;
