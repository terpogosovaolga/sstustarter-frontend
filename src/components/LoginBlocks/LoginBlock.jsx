import {useRef, useState} from 'react';
import axios from 'axios';
import serverURL from '../../serveraddress';
import { useNavigate } from 'react-router-dom';
import { logout, login } from '../../redux/slices/authSlice.js';
import { useDispatch, useSelector } from "react-redux";

export default function LoginBlock({message, setSection}) {

    const [login_input, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [mistake, setMistake] = useState(null);
    let refs = [useRef(), useRef()];
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const isAuth = useSelector((state) => state.auth.isAuth);
    const userId = useSelector((state) => state.auth.userId);
    const username = useSelector((state) => state.auth.username);
    
    const login_ = (obj) => {
        console.log(obj);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("userId", obj.id);
        localStorage.setItem("username", obj.name);
        localStorage.setItem("role", obj.role);
        dispatch(login({id: obj.id, name: obj.name, role: obj.role }));
        navigate("/profile/"+obj.id);
    }    

    const checkIn = () => {
        axios.post(serverURL+'auth/login', {
            login: login_input,
            password: password
        }).then(res => {
            console.log(res.data.message);
            if (res.data.success === false) {
                setMistake(res.data.message);
                console.log('if');
            } else {
                login_({id: res.data.id, name: res.data.name, role: res.data.role});
            }
        });
    }

    return (
        <>
            <div className="content flex-column align-items-start" style={{marginTop: "20vh"}} id="login">
                <h1>Вход</h1>
                {message === true && <p className='color-blue fw-600'>Вы успешно зарегистрировались! Войдите в систему.</p>}
                {mistake && <p className='color-blue fw-600'>{mistake}</p>}
                {
                    isAuth && <h2>Вам не доступна эта страница</h2>
                }
                { !isAuth && 
                <>
                    <form action="">
                        <input type="text" name="login" className="form-control big" placeholder="Логин" value={login_input} ref={refs[0]} onChange={(event) => setLogin(event.target.value)}/>
                        <input type="password" name="password" className="form-control big" placeholder="Пароль" value={password}  ref={refs[0]} onChange={(event) => setPassword(event.target.value)}/>

                        <div className="create_btn" onClick={checkIn}>Вход</div>
                    </form>
                    <div  style={{marginTop: "1.5rem"}}><a className="color-blue mt-3" onClick={() => setSection('register')} >Регистрация</a></div>
                    </> 
                }
                
            </div>
        </>
    );
}