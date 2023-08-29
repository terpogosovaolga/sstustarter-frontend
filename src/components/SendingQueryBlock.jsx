import axios from "axios";
import { useRef, useState } from "react";
import serverURL from '../serveraddress';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlyAlert from "./FlyAlert";

function SendingQueryBlock({project, openQuery, setSended}) {

    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [messagePat, setMessagePat] = useState("");
    const [phonePat, setPhonePat] = useState("");
    const [emailPat, setEmailPat] = useState("");

    // текст, телефон, почта
    const refs = [useRef(), useRef(), useRef()];

    const userId = useSelector(state => state.auth.userId);
    const isAuth = useSelector(state => state.auth.isAuth);

    const navigate = useNavigate();

    const check = (index, pat_method, method) => {
        let value = refs[index].current.value;
        let mistake = "";
        if (index === 0 && value.length < 40) {
            mistake="Сообщение должно быть минимум 40 символов";    
        }
        else if (index === 1 && !(/[0-9]{10,11}/.test(value) && value.trim().length !== 0)) {
            mistake = "Неправильный номер телефона";
        }
        else if (index === 2 && !(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(value)  && value.trim().length !== 0)) {
            mistake = "Неправильная почта";
        }

        console.log(index, mistake);
        method(value);
        pat_method(mistake);
    }

    const makeApplication = () => {
        if (!messagePat && !phonePat && !emailPat) {
            axios.post(serverURL + "application/new", {
                userId: userId, 
                projectId: project.id,
                message: message,
                phone: phone,
                email: email
            })
            .then(response => {
                if (response.data.success) {
                    openQuery(false);
                    setSended(true);
                }
            });
        }
    }

    return(
        <div className="background"> 
            <div className="window">
                <h1 style={{marginBottom: "1rem"}}>Заявка</h1>
                <div className="descr">
                    <p>Проект: {project.name}</p>
                    <p>Автор: {project.author.surname +" " + project.author.name + " " + (project.author.patronymic ? project.author.patronymic : "")}</p>
                    <form action="" className="mt-3">
                        <div className="one">
                            <label for="message" style={{display: "block"}}>Текст заявки</label>
                            <span className="color-blue">{ messagePat ? messagePat : "Опишите, что Вы умеете, почему Вас заинтересовал проект. Рекомендуемая длина - от 40 до 300 символов"}</span>
                            <textarea name="message" className="form-control big" placeholder="Например, я отлично пою и рисую, хорошо контактирую с людьми. Очень заинтересована в этом проекте!.." onChange={() => check(0, setMessagePat, setMessage)} ref={refs[0]}>
                            </textarea>
                            <div className="text-right">
                                <span className="symbs">{message.length} символов</span>
                            </div>
                        </div>
                        <div className="one">
                            <label  style={{display: "block"}}>Оставьте контактные данные</label>
                            <span className="color-blue">В случае одобрения заявки автор свяжется с Вами для дальнейшей беседы</span>
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <input type="text" className='form-control big' name="phone" placeholder="Телефон" onChange={() => check(1, setPhonePat, setPhone)} ref={refs[1]}/>
                                    {
                                        phonePat && <span class='color-blue'>{phonePat}</span>
                                    }
                                </div>
                                <div>
                                    <input type="email" className='form-control big' name="phone" placeholder="Почта" style={{marginLeft: "1rem" }} onChange={() => check(2, setEmailPat, setEmail)} ref={refs[2]}/>
                                    {
                                        emailPat && <span class='color-blue'>{emailPat}</span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 d-flex justify-content-end align-items-end">
                            <div className="create_btn" onClick={makeApplication}>Оставить заявку</div>

                            <div className='cancel_btn' onClick={() => openQuery(false)}>Отмена</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SendingQueryBlock;